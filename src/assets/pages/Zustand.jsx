import { create } from "zustand";

const initialUser = () => {
  const stored = localStorage.getItem("registeredUser");

  return {
    user: stored ? JSON.parse(stored) : null,
  };
};

export const LoginUser = create((set) => ({
  ...initialUser(),

  setUser: (data) => {
    set({ user: data });
    localStorage.setItem("registeredUser", JSON.stringify(data));
  },
  clearUser: () => {
    set({ user: null });
    localStorage.removeItem("registeredUser");
  },
}));
