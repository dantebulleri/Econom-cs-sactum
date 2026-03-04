"use client";

import { create } from "zustand";

interface UIState {
  sidebarOpen: boolean;
  activeModule: string | null;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  setActiveModule: (module: string | null) => void;
}

export const useUIStore = create<UIState>((set) => ({
  sidebarOpen: false,
  activeModule: null,

  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),
  setActiveModule: (activeModule) => set({ activeModule }),
}));
