"use client";

import { create } from "zustand";

interface ChatMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  createdAt: Date;
}

interface ChatState {
  messages: ChatMessage[];
  isLoading: boolean;
  conversationId: string | null;
  addMessage: (message: Omit<ChatMessage, "id" | "createdAt">) => void;
  setLoading: (loading: boolean) => void;
  setConversationId: (id: string) => void;
  clearMessages: () => void;
}

export const useChatStore = create<ChatState>((set) => ({
  messages: [],
  isLoading: false,
  conversationId: null,

  addMessage: (message) =>
    set((state) => ({
      messages: [
        ...state.messages,
        {
          ...message,
          id: crypto.randomUUID(),
          createdAt: new Date(),
        },
      ],
    })),

  setLoading: (isLoading) => set({ isLoading }),
  setConversationId: (conversationId) => set({ conversationId }),
  clearMessages: () => set({ messages: [], conversationId: null }),
}));
