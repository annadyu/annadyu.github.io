import { create } from "zustand";

const initialUser = () => {
  let user = null;

  const stored = localStorage.getItem("registeredUser");
  if (stored) {
    user = JSON.parse(stored);
  }

  return user;
};

export const LoginUser = create((set) => ({
  ...initialUser(),

  setUser: (data) => {
    set({ user: data });
      localStorage.setItem("registeredUser", JSON.stringify(data));
  },
  clearUser: () => {
    set({ user: null }); localStorage.removeItem("registeredUser");
  },
}));
