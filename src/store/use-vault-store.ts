"use client";

import { create } from "zustand";

interface VaultState {
  activeCategory: string;
  searchQuery: string;
  statusFilter: string;
  setActiveCategory: (category: string) => void;
  setSearchQuery: (query: string) => void;
  setStatusFilter: (status: string) => void;
  resetFilters: () => void;
}

export const useVaultStore = create<VaultState>((set) => ({
  activeCategory: "Todos",
  searchQuery: "",
  statusFilter: "all",

  setActiveCategory: (activeCategory) => set({ activeCategory }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setStatusFilter: (statusFilter) => set({ statusFilter }),
  resetFilters: () =>
    set({ activeCategory: "Todos", searchQuery: "", statusFilter: "all" }),
}));
