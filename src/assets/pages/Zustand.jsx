import React from "react";
import { create } from "zustand";

export const LoginUser = create((set) => ({
  user: null,
  setUser: (data) => set({ user: data }),
  clearUser: () => set({ user: null }),
}));
