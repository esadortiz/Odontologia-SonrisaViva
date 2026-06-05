import { GoogleGenerativeAI } from "@google/generative-ai";
import { SYSTEM_PROMPT, matchLocalIntent, buildLocalResponse } from "@/lib/agent-context";
import { NextResponse } from "next/server";

const MODELS = ["gemini-2.5-flash-lite", "gemini-2.5-flash", "gemini-2.0-flash-lite", "gemini-2.0-flash"];

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();
    const lastUserMessage = messages[messages.length - 1]?.content;

    if (!lastUserMessage) {
      return NextResponse.json(
        { error: "No se proporcionó mensaje" },
        { status: 400 }
      );
    }

    const intent = matchLocalIntent(lastUserMessage);
    if (intent) {
      const localResponse = buildLocalResponse(intent);
      return NextResponse.json({ message: localResponse });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({
        message:
          "Ahora mismo el asistente inteligente está temporalmente ocupado, pero puedo ayudarte por WhatsApp al 310 628 9086 o desde el formulario de contacto.",
      });
    }

    const chatHistory = [
      {
        role: "user" as const,
        parts: [{ text: "Contexto del sistema: " + SYSTEM_PROMPT }],
      },
      {
        role: "model" as const,
        parts: [
          {
            text: "Entendido. Soy Sonri, el asistente virtual de Sonrisa Viva Odontología. No confirmo citas dentro del chat, derivo a WhatsApp o al formulario de contacto. Solo respondo preguntas abiertas que no sean sobre citas, horarios, servicios, ubicación, precios, urgencias o WhatsApp.",
          },
        ],
      },
      ...messages.slice(0, -1).map((m: { role: string; content: string }) => ({
        role: m.role === "user" ? ("user" as const) : ("model" as const),
        parts: [{ text: m.content }],
      })),
    ];

    let result;
    let lastError: unknown = null;

    for (const modelId of MODELS) {
      try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: modelId });
        const chat = model.startChat({ history: chatHistory });
        result = await chat.sendMessage(lastUserMessage);
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
      console.error("Todos los modelos fallaron. Último status:", (lastError as { status?: number })?.status);
      return NextResponse.json({
        message:
          "Ahora mismo el asistente inteligente está temporalmente ocupado, pero puedo ayudarte por WhatsApp al 310 628 9086 o desde el formulario de contacto.",
      });
    }

    const fullText = result.response.text();

    return NextResponse.json({ message: fullText });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Error al procesar el mensaje";
    console.error("Error en API de chat:", msg);
    return NextResponse.json({
      message:
        "Ahora mismo el asistente inteligente está temporalmente ocupado, pero puedo ayudarte por WhatsApp al 310 628 9086 o desde el formulario de contacto.",
    });
  }
}
