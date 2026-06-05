import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import type { FunctionDeclaration } from "@google/generative-ai";
import { SYSTEM_PROMPT, getAvailableSlots, dayNames, agentServices, RESERVA_TAG_OPEN, RESERVA_TAG_CLOSE, RESERVA_REGEX } from "@/lib/agent-context";
import { NextResponse } from "next/server";

const MODELS = ["gemini-2.5-flash-lite", "gemini-2.5-flash", "gemini-2.0-flash-lite", "gemini-2.0-flash"];

const checkAvailabilityDeclaration = {
  name: "check_availability",
  description:
    "Consulta los horarios disponibles para un día de la semana y opcionalmente un servicio específico. Devuelve la lista de horas disponibles, la duración del servicio y la información del día. Úsala SIEMPRE que el usuario mencione un día o pregunte por horarios, incluso si la respuesta es corta como 'jueves' o 'el lunes'.",
  parameters: {
    type: SchemaType.OBJECT,
    properties: {
      day_of_week: {
        type: SchemaType.NUMBER,
        description:
          "Día de la semana: 0=Domingo, 1=Lunes, 2=Martes, 3=Miércoles, 4=Jueves, 5=Viernes, 6=Sábado",
        nullable: false,
      },
      service_id: {
        type: SchemaType.STRING,
        description:
          "ID del servicio (opcional). Si se proporciona, se ajustan los slots según la duración del servicio. Valores: valoracion, limpieza, ortodoncia, blanqueamiento, diseno-sonrisa, implantes, urgencias",
        nullable: true,
      },
    },
    required: ["day_of_week"],
  },
} satisfies FunctionDeclaration;

async function tryModel(
  apiKey: string,
  modelId: string,
  chatHistory: { role: string; parts: { text: string }[] }[],
  lastUserMessage: string
) {
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({
    model: modelId,
    tools: [{ functionDeclarations: [checkAvailabilityDeclaration] }],
  });

  const chat = model.startChat({ history: chatHistory });
  const result = await chat.sendMessage(lastUserMessage);
  return result;
}

const reservationBlockRegex = RESERVA_REGEX;

function extractReservation(text: string): Record<string, string> | null {
  const openEscaped = RESERVA_TAG_OPEN.replace(/[[\]]/g, "\\$&");
  const closeEscaped = RESERVA_TAG_CLOSE.replace(/[[\]]/g, "\\$&");
  const pattern = new RegExp(`${openEscaped}([\\s\\S]*?)${closeEscaped}`);
  const match = text.match(pattern);
  if (!match || !match[1]) return null;
  try {
    return JSON.parse(match[1].trim());
  } catch {
    return null;
  }
}

function stripReservationTags(text: string): string {
  return text.replace(reservationBlockRegex, "").trim();
}

export async function POST(request: Request) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "GEMINI_API_KEY no configurada. Crea un archivo .env.local con tu clave." },
      { status: 500 }
    );
  }

  try {
    const { messages } = await request.json();

    const chatHistory: { role: string; parts: { text: string }[] }[] = [
      {
        role: "user",
        parts: [{ text: "Contexto del sistema: " + SYSTEM_PROMPT }],
      },
      {
        role: "model",
        parts: [
          {
            text: "Entendido. Soy Sonri, el asistente virtual de Sonrisa Viva Odontología. Mantendré el contexto de la conversación, interpretaré respuestas cortas según lo que estémos hablando, y usaré check_availability cuando el usuario mencione un día o pregunte por horarios.",
          },
        ],
      },
      ...messages
        .slice(0, -1)
        .map((m: { role: string; content: string }) => ({
          role: m.role === "user" ? "user" : "model",
          parts: [{ text: m.content }],
        })),
    ];

    const lastUserMessage = messages[messages.length - 1]?.content;

    if (!lastUserMessage) {
      return NextResponse.json(
        { error: "No se proporcionó mensaje" },
        { status: 400 }
      );
    }

    let result;
    let usedModel = "";
    let lastError: unknown = null;

    for (const modelId of MODELS) {
      try {
        result = await tryModel(apiKey, modelId, chatHistory, lastUserMessage);
        usedModel = modelId;
        break;
      } catch (err: unknown) {
        lastError = err;
        const status = (err as { status?: number })?.status;
        if (status === 429 || status === 404) {
          console.warn(`Modelo ${modelId} no disponible (status ${status}), intentando siguiente...`);
          continue;
        }
        throw err;
      }
    }

    if (!result) {
      const lastStatus = (lastError as { status?: number })?.status;
      const reason = lastStatus === 429
        ? "Se agotó la cuota disponible para los modelos de IA. Intenta de nuevo en unos minutos."
        : "Los modelos de IA no están disponibles en este momento. Intenta de nuevo más tarde.";
      console.error("Todos los modelos fallaron. Último status:", lastStatus);
      return NextResponse.json(
        { error: reason },
        { status: 503 }
      );
    }

    let fullText = "";
    const response = result.response;
    const functionCalls = response.functionCalls?.() ?? [];

    if (functionCalls.length > 0) {
      const fc = functionCalls[0];
      if (fc.name === "check_availability") {
        const args = fc.args as Record<string, unknown>;
        const dayOfWeek = Number(args?.day_of_week ?? 0);
        const serviceId = (args?.service_id as string) || null;
        const service = serviceId
          ? agentServices.find((s) => s.id === serviceId)
          : null;
        const slotDuration = service?.duration ?? 30;

        const slots = getAvailableSlots(dayOfWeek, slotDuration);
        const dayName = dayNames[dayOfWeek] || "Desconocido";

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({
          model: usedModel,
          tools: [{ functionDeclarations: [checkAvailabilityDeclaration] }],
        });

        const chat = model.startChat({ history: chatHistory });
        const followUp = await chat.sendMessage([
          {
            functionResponse: {
              name: "check_availability",
              response: {
                day: dayName,
                day_of_week: dayOfWeek,
                is_available: dayOfWeek !== 0 && slots.length > 0,
                service: service?.title || null,
                service_duration: slotDuration,
                available_slots: slots.map((s) => s.label),
                total_slots: slots.length,
                note: dayOfWeek === 0
                  ? "No atendemos domingos. Por favor elige otro día."
                  : service
                    ? `Horarios para ${service.title} (${slotDuration} min) el ${dayName}`
                    : `Horarios disponibles el ${dayName} (slots de 30 min por defecto)`,
              },
            },
          },
        ]);

        fullText = followUp.response.text();
      } else {
        fullText = response.text();
      }
    } else {
      fullText = response.text();
    }

    const reservationData = extractReservation(fullText);
    const cleanText = stripReservationTags(fullText);

    return NextResponse.json({
      message: cleanText,
      reservation: reservationData,
    });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Error al procesar el mensaje";
    console.error("Error en API de chat:", msg);
    return NextResponse.json(
      { error: `Lo siento, hubo un problema procesando tu mensaje: ${msg}. Intenta de nuevo.` },
      { status: 500 }
    );
  }
}
