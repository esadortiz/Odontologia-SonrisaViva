# Sonrisa Viva Odontología

Landing page profesional para clínica odontológica con chatbot informativo impulsado por Gemini API y formulario de contacto con envío de emails por Resend.

## Tecnologías

- **Next.js 16** (App Router)
- **React 19** + **TypeScript**
- **Tailwind CSS v4**
- **Gemini API** — asistente virtual informativo (horarios, servicios, ubicación, derivación a WhatsApp)
- **Resend** — envío de emails desde el formulario de contacto

## Requisitos previos

- Node.js 18+
- npm

## Instalación

```bash
npm install
```

## Variables de entorno

Crea un archivo `.env.local` en la raíz del proyecto con las siguientes variables:

```env
GEMINI_API_KEY=tu_clave_de_gemini
RESEND_API_KEY=tu_clave_de_resend
RESERVAS_EMAIL=correo@destino.com
```

- `GEMINI_API_KEY` — Clave de la API de Google Gemini para el chatbot.
- `RESEND_API_KEY` — Clave de la API de Resend para enviar emails del formulario de contacto.
- `RESERVAS_EMAIL` — Correo electrónico que recibirá los mensajes del formulario de contacto.

> Las variables reales deben configurarse en `.env.local` para desarrollo local y en **Vercel Environment Variables** para producción. Nunca subas claves reales al repositorio.

## Comandos

```bash
npm run dev    # Servidor de desarrollo
npm run build  # Build de producción
npm start      # Servidor de producción
npm run lint   # Linting con ESLint
```

## Estructura del proyecto

```
src/
  app/
    api/chat/route.ts          # Endpoint de Gemini (chatbot)
    api/contacto/route.ts      # Endpoint de Resend (formulario de contacto)
    politica-de-privacidad/    # Página legal
    terminos-de-uso/           # Página legal
    layout.tsx                 # Layout raíz con SEO
    page.tsx                   # Página principal
    globals.css                # Estilos y paleta de colores
    robots.ts                  # Robots.txt
    sitemap.ts                 # Sitemap
    icon.png                   # Favicon
  components/
    Navbar.tsx
    Hero.tsx
    Servicios.tsx
    Beneficios.tsx
    Sobre.tsx
    Testimonios.tsx
    Contacto.tsx
    Footer.tsx
    Preloader.tsx
    ReservationAgent.tsx       # Chatbot Sonri
  lib/
    data.ts                    # Datos compartidos (servicios, contacto)
    agent-context.ts           # Prompt del agente, horarios, slots
  hooks/
    useAnimations.ts           # Hooks de scroll reveal y count up
public/
  images/
    sonrisa-viva-logo.png      # Logo principal
    sonrisa-viva-logo-2.png    # Logo para favicon
    sonri-bot.png              # Avatar del chatbot
    clinica-odontologica.jpg   # Imagen sección Sobre
    sonrisa-odontologia.jpg    # Imagen sección Hero
    servicios/                 # Imágenes de las 6 cards de servicios
```

## Despliegue en Vercel

1. Subir el proyecto a GitHub.
2. Importar el repositorio en [vercel.com](https://vercel.com).
3. Agregar las variables de entorno en **Settings → Environment Variables**:
   - `GEMINI_API_KEY`
   - `RESEND_API_KEY`
   - `RESERVAS_EMAIL`
4. Hacer deploy.
5. Verificar que el chatbot y el formulario de contacto funcionen correctamente.

## Créditos

Desarrollado por [david-ortiz.dev](https://www.david-ortiz.dev)
