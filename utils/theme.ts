import * as SecureStore from "expo-secure-store";
import { Appearance } from "react-native";
import { z } from "zod";
import getColorScheme = Appearance.getColorScheme;

export type Theme = "light" | "dark";
const themeScheme = z.enum(["light", "dark"]);

const getStoredTheme = (): Theme | null => {
  const theme = SecureStore.getItem("theme");
  const validation = themeScheme.safeParse(theme);
  return validation.success ? (validation.data as Theme) : null;
};

export const getThemeFromStorage = (): Theme => {
  const colorScheme = getColorScheme();
  const storedTheme = getStoredTheme();

  if (storedTheme) {
    return storedTheme;
  }

  const defaultScheme: Theme = colorScheme === "dark" ? "dark" : "light";
  saveThemeToStorage(defaultScheme);
  return defaultScheme;
};

export const saveThemeToStorage = (theme: Theme): void => {
  console.log("saveThemeToStorage");
  SecureStore.setItem("theme", theme);
};
export const reverseTheme = (theme: Theme): Theme => {
  return theme === "light" ? "dark" : "light";
};
