import { create } from "zustand";
import { getThemeFromStorage, saveThemeToStorage, Theme } from "@/utils/theme";

interface ThemeState {
  theme: Theme;
  setTheme: (newTheme: Theme) => void;
  switchTheme: () => void;
}

// Create the Zustand store

export const useThemeStore = create<ThemeState>((set, getState) => ({
  theme: getThemeFromStorage(), // Initialize with stored theme
  setTheme: (newTheme: Theme) => {
    saveThemeToStorage(newTheme);
    set({ theme: newTheme });
  },
  switchTheme: () => {
    const newTheme = getState().theme === "light" ? "dark" : "light";
    saveThemeToStorage(newTheme);
    set({ theme: newTheme });
  },
}));
