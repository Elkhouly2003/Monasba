import { create } from "zustand";

export const useUser = create((set) => ({
  user: null,
  setUser: (val) => set({ user: val }),
}));
