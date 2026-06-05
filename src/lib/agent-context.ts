export const agentServices = [
  { id: "valoracion", title: "Valoración odontológica" },
  { id: "limpieza", title: "Limpieza dental" },
  { id: "ortodoncia", title: "Ortodoncia" },
  { id: "blanqueamiento", title: "Blanqueamiento dental" },
  { id: "diseno-sonrisa", title: "Diseño de sonrisa" },
  { id: "implantes", title: "Implantes dentales" },
  { id: "urgencias", title: "Urgencias odontológicas" },
] as const;

export const WHATSAPP_NUMBER = "573106289086";
export const WHATSAPP_DISPLAY = "310 628 9086";
export const WHATSAPP_CITA_URL =
  "https://wa.me/573106289086?text=Hola%2C%20quiero%20solicitar%20una%20cita%20odontol%C3%B3gica%20en%20Sonrisa%20Viva.%20Me%20gustar%C3%ADa%20conocer%20disponibilidad.";

export function whatsappServiceUrl(serviceTitle: string): string {
  const msg = encodeURIComponent(
    `Hola, quiero solicitar una cita de ${serviceTitle} en Sonrisa Viva. Me gustaría conocer disponibilidad.`
  );
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`;
}

export function matchLocalIntent(text: string):
  | { type: "cita"; service?: string }
  | { type: "horarios" }
  | { type: "servicios" }
  | { type: "ubicacion" }
  | { type: "precios"; service?: string }
  | { type: "urgencias" }
  | { type: "whatsapp" }
  | null {
  const t = text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  const urgencyKeywords = [
    "dolor de muela", "urgencia", "se me partio un diente",
    "se me quebro un diente", "dolor fuerte", "dolor intenso",
    "sangrado", "hinchazon", "se me cayo un diente", "emergencia dental",
    "urgencia odontologica",
  ];
  if (urgencyKeywords.some((k) => t.includes(k))) {
    return { type: "urgencias" };
  }

  const citaKeywords = [
    "quiero reservar", "quiero agendar", "quiero apartar una cita",
    "quiero una cita", "necesito una cita", "cita para el",
    "reservar cita", "agendar cita", "solicitar cita", "pedir cita",
    "apartar cita", "quiero apartar",
  ];
  if (citaKeywords.some((k) => t.includes(k))) {
    const found = agentServices.find((s) => t.includes(s.id.replace("-", " ")));
    return { type: "cita", service: found?.title };
  }

  const serviceKeywords = [
    "limpieza dental", "limpieza", "ortodoncia", "blanqueamiento",
    "diseno de sonrisa", "diseño de sonrisa", "implantes dentales",
    "implantes", "valoracion", "urgencia odontologica",
    "quiero limpieza", "quiero ortodoncia", "quiero blanqueamiento",
    "quiero una valoracion", "quiero una urgencia",
    "quiero implantes", "quiero diseno", "quiero diseño",
  ];
  for (const s of agentServices) {
    const normalizedTitle = s.title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    if (t.includes(s.id.replace("-", " ")) || t.includes(normalizedTitle)) {
      if (t.includes("precio") || t.includes("cuanto") || t.includes("valor") || t.includes("costo")) {
        return { type: "precios", service: s.title };
      }
      return { type: "cita", service: s.title };
    }
  }
  for (const kw of serviceKeywords) {
    if (t.includes(kw)) {
      const found = agentServices.find((s) => kw.includes(s.id.replace("-", " ")));
      if (found) {
        if (t.includes("precio") || t.includes("cuanto") || t.includes("valor") || t.includes("costo")) {
          return { type: "precios", service: found.title };
        }
        return { type: "cita", service: found.title };
      }
      return { type: "cita" };
    }
  }

  const horarioKeywords = [
    "horario", "hora de atencion", "atienden", "a que hora",
    "cuando atienden", "horario de atencion", "que horas",
    "horas disponibles", "tienen horario",
  ];
  if (horarioKeywords.some((k) => t.includes(k))) {
    return { type: "horarios" };
  }

  const servicioKeywords = [
    "que servicios", "que ofrecen", "que tratamientos", "servicios odontologicos",
    "servicios tienen", "que hacen", "tratamientos ofrecen",
  ];
  if (servicioKeywords.some((k) => t.includes(k))) {
    return { type: "servicios" };
  }

  const ubicacionKeywords = [
    "donde estan", "donde quedan", "ubicacion", "direccion", "como llego",
    "donde queda", "donde estan ubicados", "direccion de la clinica",
  ];
  if (ubicacionKeywords.some((k) => t.includes(k))) {
    return { type: "ubicacion" };
  }

  const precioKeywords = [
    "cuanto cuestan", "cuales son los precios", "valores", "cuanto sale",
    "precio", "cuanto cuesta", "cuanto vale", "costo", "tarifa",
  ];
  if (precioKeywords.some((k) => t.includes(k))) {
    return { type: "precios" };
  }

  const whatsappKeywords = [
    "hablar por whatsapp", "whatsapp", "contactar por whatsapp",
    "escribir por whatsapp", "numero de whatsapp",
  ];
  if (whatsappKeywords.some((k) => t.includes(k))) {
    return { type: "whatsapp" };
  }

  return null;
}

export function buildLocalResponse(
  intent:
    | { type: "cita"; service?: string }
    | { type: "horarios" }
    | { type: "servicios" }
    | { type: "ubicacion" }
    | { type: "precios"; service?: string }
    | { type: "urgencias" }
    | { type: "whatsapp" }
): string {
  switch (intent.type) {
    case "cita": {
      if (intent.service) {
        return (
          `Perfecto. Para solicitar una cita de **${intent.service}**, puedes escribirnos por WhatsApp al ${WHATSAPP_DISPLAY} o enviar un mensaje desde el formulario de contacto de la página. La disponibilidad debe ser confirmada por la clínica.\n\n` +
          `💬 [Escríbenos por WhatsApp](${whatsappServiceUrl(intent.service)})`
        );
      }
      return (
        `Claro, puedo orientarte para solicitar tu cita. Para confirmar disponibilidad real, puedes escribirnos por WhatsApp al ${WHATSAPP_DISPLAY} o enviar un mensaje desde el formulario de contacto de la página. La cita queda sujeta a confirmación por la clínica.\n\n` +
        `💬 [Escríbenos por WhatsApp](${WHATSAPP_CITA_URL})`
      );
    }
    case "horarios":
      return (
        `Nuestros horarios de atención son:\n\n` +
        `• **Lunes a viernes:** 7:00 AM a 12:00 PM y 2:00 PM a 5:00 PM.\n` +
        `• **Sábados:** 7:00 AM a 12:00 PM.\n` +
        `• **Domingos:** no hay atención.\n\n` +
        `Para confirmar disponibilidad real, escríbenos por WhatsApp al ${WHATSAPP_DISPLAY} o envía un mensaje desde el formulario de contacto.`
      );
    case "servicios":
      return (
        `En Sonrisa Viva Odontología ofrecemos:\n\n` +
        `• Valoración odontológica\n` +
        `• Limpieza dental\n` +
        `• Ortodoncia\n` +
        `• Blanqueamiento dental\n` +
        `• Diseño de sonrisa\n` +
        `• Implantes dentales\n` +
        `• Urgencias odontológicas\n\n` +
        `¿Quieres solicitar información o una cita por WhatsApp?`
      );
    case "ubicacion":
      return (
        `Estamos ubicados en **Cl. 6 #23-7, Valledupar, Cesar.** También puedes ver el mapa en la sección de contacto de nuestra página.`
      );
    case "precios": {
      if (intent.service) {
        return (
          `Los valores de **${intent.service}** pueden variar según la valoración y el tratamiento que necesites. Para recibir una orientación más precisa, puedes escribirnos por WhatsApp al ${WHATSAPP_DISPLAY} o enviar un mensaje desde el formulario de contacto.\n\n` +
          `💬 [Escríbenos por WhatsApp](${whatsappServiceUrl(intent.service)})`
        );
      }
      return (
        `Los valores pueden variar según la valoración y el tratamiento que necesites. Para recibir una orientación más precisa, puedes escribirnos por WhatsApp al ${WHATSAPP_DISPLAY} o enviar un mensaje desde el formulario de contacto.\n\n` +
        `💬 [Escríbenos por WhatsApp](${WHATSAPP_CITA_URL})`
      );
    }
    case "urgencias":
      return (
        `Lamento que estés pasando por eso. Para una urgencia odontológica, escríbenos por WhatsApp al ${WHATSAPP_DISPLAY} para confirmar disponibilidad lo antes posible. También puedes enviar un mensaje desde el formulario de contacto.\n\n` +
        `💬 [Escríbenos por WhatsApp](${WHATSAPP_CITA_URL})\n\n` +
        `Si hay **hinchazón severa, fiebre, sangrado abundante o dolor intenso**, busca atención presencial urgente.`
      );
    case "whatsapp":
      return (
        `Puedes escribirnos por WhatsApp al **${WHATSAPP_DISPLAY}** y con gusto te orientamos.\n\n` +
        `💬 [Abrir WhatsApp](${WHATSAPP_CITA_URL})`
      );
  }
}

export const SYSTEM_PROMPT = `Eres el asistente virtual de Sonrisa Viva Odontología. Tu nombre es "Sonri". Tu objetivo es ayudar a los pacientes a consultar información sobre la clínica y orientarlos.

REGLAS IMPORTANTES:
- Responde SIEMPRE en español.
- Sé amable, profesional y cercano.
- No inventes información que no esté en este contexto.
- Si el usuario pregunta algo fuera del ámbito odontológico, redirige amablemente.
- NUNCA confirmes citas dentro del chat. NUNCA pidas datos personales como nombre, teléfono, correo para reservar. NUNCA generes confirmaciones de reserva.
- Si el usuario quiere una cita, derívalo a WhatsApp o al formulario de contacto de la página.
- Los horarios, servicios, ubicación, precios y urgencias se manejan localmente — NO necesitas responder sobre esos temas, el sistema los resuelve automáticamente.
- Solo respondes preguntas abiertas que NO sean sobre: citas, horarios, servicios, ubicación, precios, urgencias o WhatsApp.

INFORMACIÓN DE LA CLÍNICA:
- Nombre: Sonrisa Viva Odontología
- Dirección: Cl. 6 #23-7, Valledupar, Cesar
- Teléfono/WhatsApp: 310 628 9086
- Email: esauortiz014@gmail.com

SERVICIOS:
- Valoración odontológica
- Limpieza dental
- Ortodoncia
- Blanqueamiento dental
- Diseño de sonrisa
- Implantes dentales
- Urgencias odontológicas

HORARIOS:
- Lunes a viernes: 7:00 AM a 12:00 PM y 2:00 PM a 5:00 PM
- Sábados: 7:00 AM a 12:00 PM
- Domingos: Cerrado

TONO: amable, profesional, claro, en español, no demasiado largo.
Si no sabes la respuesta, sugiere contactar por WhatsApp al 310 628 9086.` as const;
