"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { ChatInput } from "./ChatInput";
import { MessageBubble } from "./MessageBubble";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}

interface ChatWindowProps {
  apiEndpoint: string;
  placeholder?: string;
  systemDescription?: string;
}

export function ChatWindow({
  apiEndpoint,
  placeholder,
  systemDescription,
}: ChatWindowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = useCallback(async (content: string) => {
    const userMsg: ChatMessage = { id: crypto.randomUUID(), role: "user", content };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const res = await fetch(apiEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (!res.ok || !res.body) throw new Error("Request failed");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      const assistantId = crypto.randomUUID();
      let accumulated = "";

      setMessages((prev) => [...prev, { id: assistantId, role: "assistant", content: "" }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        accumulated += chunk;
        setMessages((prev) =>
          prev.map((m) => (m.id === assistantId ? { ...m, content: accumulated } : m))
        );
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { id: crypto.randomUUID(), role: "assistant", content: "Error al procesar la solicitud." },
      ]);
    } finally {
      setIsLoading(false);
    }
  }, [messages, apiEndpoint]);

  return (
    <div className="flex h-full flex-col rounded-lg border border-border bg-surface/30">
      {/* Messages area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-5">
        {messages.length === 0 ? (
          <div className="flex h-full items-center justify-center">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-border bg-surface">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent">
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                </svg>
              </div>
              {systemDescription && (
                <p className="max-w-sm font-serif text-sm italic text-text-tertiary">
                  {systemDescription}
                </p>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message) => (
              <MessageBubble
                key={message.id}
                role={message.role as "user" | "assistant"}
                content={message.content}
              />
            ))}
            {isLoading && messages[messages.length - 1]?.role === "user" && (
              <div className="flex justify-start">
                <div className="rounded-lg border border-border bg-surface px-4 py-3">
                  <div className="flex items-center gap-1.5">
                    <div className="h-1.5 w-1.5 rounded-full bg-accent/60 animate-pulse" />
                    <div className="h-1.5 w-1.5 rounded-full bg-accent/60 animate-pulse [animation-delay:0.2s]" />
                    <div className="h-1.5 w-1.5 rounded-full bg-accent/60 animate-pulse [animation-delay:0.4s]" />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Input area */}
      <ChatInput
        onSend={handleSend}
        isLoading={isLoading}
        placeholder={placeholder}
      />
    </div>
  );
}
