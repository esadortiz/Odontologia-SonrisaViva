import { Resend } from "resend";
import { NextResponse } from "next/server";

interface ReservationData {
  nombre: string;
  telefono: string;
  correo: string;
  servicio: string;
  dia: string;
  hora: string;
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const destinatario = process.env.RESERVAS_EMAIL;

  if (!apiKey || !destinatario) {
    return NextResponse.json(
      { error: "Variables de entorno de Resend no configuradas" },
      { status: 500 }
    );
  }

  try {
    const data: ReservationData = await request.json();

    const { nombre, telefono, correo, servicio, dia, hora } = data;

    if (!nombre || !telefono || !correo || !servicio || !dia || !hora) {
      return NextResponse.json(
        { error: "Faltan campos obligatorios" },
        { status: 400 }
      );
    }

    const resend = new Resend(apiKey);

    const cleanPhone = telefono.replace(/[^0-9+]/g, "");
    const whatsappLink = `https://wa.me/${cleanPhone.replace(/^\\+/, "")}`;

    const { error } = await resend.emails.send({
      from: "Sonrisa Viva <onboarding@resend.dev>",
      to: destinatario,
      subject: `Nueva reserva: ${servicio} - ${nombre}`,
      html: `
<!DOCTYPE html>
<html lang="es">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f0f9ff;font-family:Arial,Helvetica,sans-serif;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f0f9ff;padding:24px 16px;">
  <tr><td align="center">
    <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

      <tr>
        <td style="background:#0077B6;color:#ffffff;padding:16px 20px;border-radius:8px 8px 0 0;text-align:center;">
          <h1 style="margin:0;font-size:22px;font-weight:700;line-height:1.3;">🦷 Nueva reserva odontológica</h1>
          <p style="margin:4px 0 0;font-size:13px;opacity:0.85;">Solicitud recibida desde el asistente virtual</p>
        </td>
      </tr>

      <tr>
        <td style="background:#ffffff;padding:20px;border:1px solid #e2e8f0;border-top:none;border-radius:0 0 8px 8px;">

          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:15px;">
            <tr>
              <td style="padding:10px 0;font-weight:600;color:#1a2332;width:130px;vertical-align:top;font-size:14px;">Nombre</td>
              <td style="padding:10px 0;color:#334155;">${nombre}</td>
            </tr>
            <tr>
              <td style="padding:10px 0;font-weight:600;color:#1a2332;vertical-align:top;font-size:14px;border-top:1px solid #f1f5f9;">Teléfono</td>
              <td style="padding:10px 0;color:#334155;border-top:1px solid #f1f5f9;">
                <a href="tel:${cleanPhone}" style="color:#0077B6;text-decoration:none;">${telefono}</a>
              </td>
            </tr>
            <tr>
              <td style="padding:10px 0;font-weight:600;color:#1a2332;vertical-align:top;font-size:14px;border-top:1px solid #f1f5f9;">Correo</td>
              <td style="padding:10px 0;color:#334155;border-top:1px solid #f1f5f9;word-break:break-word;overflow-wrap:anywhere;">
                <a href="mailto:${correo}" style="color:#0077B6;text-decoration:none;">${correo}</a>
              </td>
            </tr>
            <tr>
              <td style="padding:10px 0;font-weight:600;color:#1a2332;vertical-align:top;font-size:14px;border-top:1px solid #f1f5f9;">Servicio</td>
              <td style="padding:10px 0;color:#334155;border-top:1px solid #f1f5f9;">${servicio}</td>
            </tr>
            <tr>
              <td style="padding:10px 0;font-weight:600;color:#1a2332;vertical-align:top;font-size:14px;border-top:1px solid #f1f5f9;">Día</td>
              <td style="padding:10px 0;color:#334155;border-top:1px solid #f1f5f9;">${dia}</td>
            </tr>
            <tr>
              <td style="padding:10px 0;font-weight:600;color:#1a2332;vertical-align:top;font-size:14px;border-top:1px solid #f1f5f9;">Hora</td>
              <td style="padding:10px 0;color:#334155;border-top:1px solid #f1f5f9;">${hora}</td>
            </tr>
          </table>

          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:20px;">
            <tr>
              <td style="padding:8px 0;">
                <table role="presentation" cellpadding="0" cellspacing="0" style="display:inline-block;">
                  <tr>
                    <td style="background:#25D366;border-radius:6px;padding:10px 18px;text-align:center;">
                      <a href="${whatsappLink}" target="_blank" style="color:#ffffff;text-decoration:none;font-size:14px;font-weight:600;">💬 WhatsApp</a>
                    </td>
                  </tr>
                </table>
              </td>
              <td style="padding:8px 0;padding-left:12px;">
                <table role="presentation" cellpadding="0" cellspacing="0" style="display:inline-block;">
                  <tr>
                    <td style="background:#0077B6;border-radius:6px;padding:10px 18px;text-align:center;">
                      <a href="mailto:${correo}" style="color:#ffffff;text-decoration:none;font-size:14px;font-weight:600;">📧 Responder</a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>

        </td>
      </tr>

      <tr>
        <td style="padding:16px 0;text-align:center;">
          <p style="margin:0;color:#94a3b8;font-size:12px;line-height:1.5;">
            Esta reserva fue generada automáticamente desde el agente virtual de Sonrisa Viva Odontología.
          </p>
        </td>
      </tr>

    </table>
  </td></tr>
</table>
</body>
</html>
`,
    });

  if (error) {
    console.error("Error enviando email:", error instanceof Error ? error.message : "Error desconocido");
    return NextResponse.json(
        { error: "Error al enviar el email de confirmación" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, message: "Reserva enviada correctamente" });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Error desconocido";
    console.error("Error en API de reservas:", msg);
    return NextResponse.json(
      { error: "Error al procesar la reserva" },
      { status: 500 }
    );
  }
}
