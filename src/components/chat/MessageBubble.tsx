"use client";

import { motion } from "framer-motion";
import { MarkdownRenderer } from "../ui/MarkdownRenderer";

interface MessageBubbleProps {
  role: "user" | "assistant";
  content: string;
}

export function MessageBubble({ role, content }: MessageBubbleProps) {
  const isUser = role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-[80%] rounded-lg px-4 py-3 ${
          isUser
            ? "bg-accent/10 border border-accent/20"
            : "bg-surface border border-border"
        }`}
      >
        {isUser ? (
          <p className="font-sans text-sm text-text-primary whitespace-pre-wrap">
            {content}
          </p>
        ) : (
          <MarkdownRenderer content={content} />
        )}
        <p className={`mt-1 font-sans text-[10px] ${isUser ? "text-accent/60 text-right" : "text-text-muted"}`}>
          {isUser ? "Tú" : "Economic Lab"}
        </p>
      </div>
    </motion.div>
  );
}
