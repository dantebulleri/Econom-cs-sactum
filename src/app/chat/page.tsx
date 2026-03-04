"use client";

import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { ChatWindow } from "@/components/chat/ChatWindow";

export default function ChatPage() {
  return (
    <main className="mx-auto flex h-[calc(100vh-3.5rem)] max-w-4xl flex-col px-6 pt-20 pb-4">
      <AnimatedSection delay={0.1}>
        <div className="mb-4">
          <p className="mb-1 font-sans text-xs uppercase tracking-widest text-text-muted">
            Módulo 4
          </p>
          <h1 className="font-serif text-2xl font-normal text-text-primary">
            Chat Económico
          </h1>
        </div>
      </AnimatedSection>

      <div className="flex-1 min-h-0">
        <ChatWindow
          apiEndpoint="/api/chat"
          placeholder="Preguntá sobre economía, modelos, papers, metodología..."
          systemDescription="Tu colega economista está listo para conversar. Preguntale sobre teoría, metodología, datos, o cualquier tema económico."
        />
      </div>
    </main>
  );
}
