"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  MessageCircle,
  X,
  Send,
  Bot,
  User,
  CheckCircle2,
  Trash2,
  CalendarDays,
  Clock,
  Stethoscope,
  MapPin,
  ChevronRight,
} from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

interface ReservationData {
  nombre: string;
  telefono: string;
  correo: string;
  servicio: string;
  dia: string;
  hora: string;
}

const quickActions = [
  {
    icon: CalendarDays,
    label: "Reservar una cita",
    message: "Quiero reservar una cita",
  },
  {
    icon: Clock,
    label: "Ver horarios",
    message: "Qué horarios tienen disponibles",
  },
  {
    icon: Stethoscope,
    label: "Servicios odontológicos",
    message: "Qué servicios odontológicos ofrecen",
  },
  {
    icon: MapPin,
    label: "Ubicación",
    message: "Dónde están ubicados",
  },
  {
    icon: MessageCircle,
    label: "Hablar por WhatsApp",
    href: "https://wa.me/573106289086?text=Hola%2C%20quiero%20m%C3%A1s%20informaci%C3%B3n%20sobre%20los%20servicios%20odontol%C3%B3gicos%20de%20Sonrisa%20Viva.",
  },
];

function generateId() {
  return Math.random().toString(36).substring(2, 10);
}

function BotAvatar() {
  return (
    <div className="flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary overflow-hidden">
      <Image
        src="/images/sonri-bot.png"
        alt="Sonri"
        width={32}
        height={32}
        className="h-full w-full object-cover rounded-full"
        onError={(e) => {
          (e.target as HTMLImageElement).style.display = "none";
          (e.target as HTMLImageElement).nextElementSibling?.classList.remove(
            "hidden"
          );
        }}
      />
      <Bot className="h-3.5 w-3.5 sm:h-4 sm:w-4 hidden" />
    </div>
  );
}

function TypingDots() {
  return (
    <div
      className="flex items-center gap-1 px-1"
      role="status"
      aria-label="Sonri está escribiendo"
    >
      <span className="sr-only">Sonri está escribiendo...</span>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="block h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-primary/60 animate-typing-dot"
          style={{ animationDelay: `${i * 0.2}s` }}
        />
      ))}
    </div>
  );
}

export default function ReservationAgent() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [reservationSent, setReservationSent] = useState(false);
  const [errorBanner, setErrorBanner] = useState<string | null>(null);
  const [showCapsule, setShowCapsule] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const showWelcome = messages.length === 0;

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => setShowCapsule(true), 400);
      return () => clearTimeout(timer);
    } else {
      setShowCapsule(false);
    }
  }, [isOpen]);

  useEffect(() => {
    function handleOpenEvent() {
      if (!isOpen) {
        handleOpen();
      }
    }
    window.addEventListener("open-chat-agent", handleOpenEvent);
    return () => window.removeEventListener("open-chat-agent", handleOpenEvent);
  });

  function addMessage(role: "user" | "assistant", content: string) {
    setMessages((prev) => [...prev, { id: generateId(), role, content }]);
    setErrorBanner(null);
  }

  async function sendReservation(data: ReservationData) {
    setIsLoading(true);
    setErrorBanner(null);
    try {
      const res = await fetch("/api/reservas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (res.ok && result.success) {
        setReservationSent(true);
        addMessage(
          "assistant",
          "✅ ¡Reserva enviada con éxito! La clínica recibió tu solicitud y se comunicará contigo si necesita confirmar algún detalle."
        );
      } else {
        setErrorBanner(result.error || "Error al enviar la reserva");
        addMessage(
          "assistant",
          `Hubo un problema al enviar la reserva: ${result.error || "Error desconocido"}. Puedes intentarlo de nuevo o contactar a la clínica.`
        );
      }
    } catch {
      setErrorBanner("Error de conexión al enviar la reserva");
      addMessage(
        "assistant",
        "Error de conexión al enviar la reserva. Puedes intentarlo de nuevo o contactar a la clínica."
      );
    } finally {
      setIsLoading(false);
    }
  }

  async function sendMessage(text: string) {
    addMessage("user", text);
    setInput("");
    setIsLoading(true);
    setReservationSent(false);
    setErrorBanner(null);

    try {
      const chatMessages = messages
        .filter((m) => m.role === "user" || m.role === "assistant")
        .map((m) => ({ role: m.role, content: m.content }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...chatMessages, { role: "user", content: text }],
        }),
      });

      const data = await res.json();

      if (res.ok && data.message) {
        addMessage("assistant", data.message);

        if (data.reservation) {
          await sendReservation(data.reservation);
        }
      } else {
        setErrorBanner(data.error || "Error al procesar el mensaje");
        addMessage(
          "assistant",
          data.error ||
            "Lo siento, no pude procesar tu mensaje. Intenta de nuevo."
        );
      }
    } catch {
      setErrorBanner("Error de conexión");
      addMessage(
        "assistant",
        "Error de conexión. Por favor intenta de nuevo en unos momentos."
      );
    } finally {
      setIsLoading(false);
    }
  }

  function handleSend() {
    const text = input.trim();
    if (!text || isLoading) return;
    sendMessage(text);
  }

  function handleOpen() {
    setIsOpen(true);
  }

  function handleClearHistory() {
    setMessages([]);
    setReservationSent(false);
    setErrorBanner(null);
  }

  return (
    <>
      {isOpen && (
        <div
          role="dialog"
          aria-label="Chat con asistente virtual Sonri"
          className="fixed bottom-20 sm:bottom-24 right-3 sm:right-6 z-50 w-[calc(100vw-24px)] h-[calc(100vh-120px)] max-h-[680px] sm:w-[420px] sm:h-[640px] flex flex-col rounded-2xl shadow-2xl border border-gray-200 bg-white overflow-hidden"
        >
          <div className="flex items-center justify-between bg-primary px-4 sm:px-5 py-3 sm:py-4 shrink-0">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-white/20 overflow-hidden shrink-0">
                <Image
                  src="/images/sonri-bot.png"
                  alt="Sonri"
                  width={36}
                  height={36}
                  className="h-full w-full object-cover rounded-full"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                    (
                      e.target as HTMLImageElement
                    ).nextElementSibling?.classList.remove("hidden");
                  }}
                />
                <Bot className="h-4 w-4 sm:h-5 sm:w-5 text-white hidden" />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-semibold text-white">
                  Sonri
                </p>
                <div className="flex items-center gap-1.5">
                  <span className="block h-1.5 w-1.5 rounded-full bg-green-400" />
                  <p className="text-[10px] sm:text-xs text-white/70">
                    En línea
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={handleClearHistory}
                className="flex h-8 w-8 items-center justify-center rounded-full text-white/70 hover:bg-white/10 hover:text-white transition-colors"
                aria-label="Borrar historial del chat"
              >
                <Trash2 className="h-4 w-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full text-white/80 hover:bg-white/10 hover:text-white transition-colors"
                aria-label="Cerrar chat"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {errorBanner && (
            <div className="bg-red-50 border-b border-red-100 px-4 py-2 flex items-center justify-between gap-2 shrink-0">
              <p className="text-xs text-red-600 leading-snug">
                {errorBanner}
              </p>
              <button
                onClick={() => setErrorBanner(null)}
                className="text-red-400 hover:text-red-600 shrink-0"
                aria-label="Cerrar aviso de error"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          )}

        <div
          className="flex-1 min-h-0 overflow-y-auto p-3 sm:p-4"
          aria-live="polite"
          aria-label="Mensajes del chat"
        >
          {showWelcome ? (
            <div className="flex flex-col items-center justify-center text-center min-h-full py-6 sm:py-8 px-2">
                <div className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-primary/10 text-primary mb-4 overflow-hidden">
                  <Image
                    src="/images/sonri-bot.png"
                    alt="Sonri"
                    width={80}
                    height={80}
                    className="h-full w-full object-cover rounded-full"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                      (
                        e.target as HTMLImageElement
                      ).nextElementSibling?.classList.remove("hidden");
                    }}
                  />
                  <Bot className="h-8 w-8 sm:h-10 sm:w-10 hidden" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-foreground mb-1">
                  Hola, soy Sonri
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground mb-1.5">
                  Tu asistente virtual de Sonrisa Viva Odontología
                </p>
                <p className="text-xs text-muted-foreground/80 max-w-[220px] sm:max-w-xs mb-5 sm:mb-6 leading-relaxed">
                  Puedo ayudarte a consultar servicios, horarios, ubicación o
                  reservar una cita.
                </p>

                <div className="grid grid-cols-2 gap-2 sm:gap-2.5 w-full max-w-[280px] sm:max-w-xs">
                  {quickActions.map((action) =>
                    action.href ? (
                      <a
                        key={action.label}
                        href={action.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 rounded-xl bg-muted/80 hover:bg-muted px-3 py-2.5 sm:py-3 text-xs sm:text-sm font-medium text-foreground transition-colors border border-gray-100 hover:border-primary/20"
                      >
                        <action.icon className="h-4 w-4 shrink-0 text-primary" />
                        <span className="leading-tight">{action.label}</span>
                      </a>
                    ) : (
                      <button
                        key={action.label}
                        onClick={() => {
                          if (action.message) sendMessage(action.message);
                        }}
                        disabled={isLoading}
                        className="flex items-center gap-2 rounded-xl bg-muted/80 hover:bg-muted px-3 py-2.5 sm:py-3 text-xs sm:text-sm font-medium text-foreground transition-colors border border-gray-100 hover:border-primary/20 disabled:opacity-50 disabled:cursor-not-allowed text-left"
                        aria-label={action.label}
                      >
                        <action.icon className="h-4 w-4 shrink-0 text-primary" />
                        <span className="leading-tight">{action.label}</span>
                      </button>
                    )
                  )}
                </div>
              </div>
            ) : (
              <div className="space-y-3 sm:space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex gap-2 sm:gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                  >
                    {msg.role === "assistant" ? (
                      <BotAvatar />
                    ) : (
                      <div className="flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground">
                        <User className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                      </div>
                    )}
                    <div
                      className={`min-w-0 max-w-[85%] rounded-2xl px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap break-words ${
                        msg.role === "assistant"
                          ? "bg-muted text-foreground rounded-tl-md"
                          : "bg-primary text-white rounded-tr-md"
                      }`}
                      style={{ overflowWrap: "anywhere" }}
                    >
                      {msg.content.split(/(\*\*[^*]+\*\*)/).map((part, i) => {
                        if (part.startsWith("**") && part.endsWith("**")) {
                          return (
                            <strong key={i}>{part.slice(2, -2)}</strong>
                          );
                        }
                        return <span key={i}>{part}</span>;
                      })}
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex gap-2 sm:gap-2.5">
                    <BotAvatar />
                    <div className="rounded-2xl rounded-tl-md bg-muted px-3 sm:px-4 py-2.5 sm:py-3">
                      <TypingDots />
                    </div>
                  </div>
                )}

                {reservationSent && !isLoading && (
                  <div className="pl-8 sm:pl-10">
                    <button
                      onClick={() => {
                        setReservationSent(false);
                        sendMessage("Quiero reservar otra cita");
                      }}
                      className="inline-flex items-center gap-2 rounded-full bg-secondary/10 px-4 py-2 text-xs font-medium text-secondary hover:bg-secondary hover:text-white transition-colors"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      Reservar otra cita
                    </button>
                  </div>
                )}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className="border-t border-gray-100 p-2 sm:p-3 shrink-0">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Escribe tu mensaje..."
                disabled={isLoading}
                className="flex-1 rounded-full border border-gray-200 bg-muted/50 px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full bg-primary text-white hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Enviar mensaje"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="fixed bottom-6 right-4 sm:right-6 z-50 flex items-center gap-2 sm:gap-3">
        {!isOpen && showCapsule && (
          <button
            onClick={handleOpen}
            className="animate-capsule-in flex items-center gap-1.5 sm:gap-2 rounded-full bg-foreground/90 hover:bg-foreground shadow-lg px-3 sm:px-4 py-2 sm:py-2.5 text-white text-xs sm:text-sm font-medium whitespace-nowrap transition-colors group"
            aria-label="Reserva aquí - Abrir asistente"
          >
            <span className="hidden sm:inline animate-capsule-pulse">
              Reserva aquí
            </span>
            <span className="sm:hidden animate-capsule-pulse">Reserva</span>
            <ChevronRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
          </button>
        )}

        <button
          onClick={() => (isOpen ? setIsOpen(false) : handleOpen())}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-primary shadow-lg hover:bg-primary/90 hover:shadow-xl transition-all hover:-translate-y-0.5 overflow-hidden"
          aria-label={isOpen ? "Cerrar asistente" : "Abrir asistente"}
        >
          {isOpen ? (
            <X className="h-6 w-6 text-white" />
          ) : (
            <Image
              src="/images/sonri-bot.png"
              alt="Sonri"
              width={40}
              height={40}
              className="h-10 w-10 object-cover rounded-full"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
                (
                  e.target as HTMLImageElement
                ).nextElementSibling?.classList.remove("hidden");
              }}
            />
          )}
          <MessageCircle className="h-6 w-6 text-white hidden" />
        </button>
      </div>
    </>
  );
}
