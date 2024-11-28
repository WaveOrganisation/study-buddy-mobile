import "react-native-gesture-handler";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { useColorScheme } from "react-native";
import "../i18n/i18n";
import { Providers } from "@/components/Providers";
import { useServerHealth } from "@/hooks/useServerHealth";
export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "index",
};

// SplashScreen.preventAutoHideAsync();
export default function RootLayout() {
  useServerHealth();
  const colorScheme = useColorScheme();

  const [fontLoaded] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
    "Londrina-Sketch": require("assets/fonts/LondrinaSketch-Regular.ttf"),
  });
  useEffect(() => {
    if (fontLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontLoaded]);

  if (!fontLoaded) {
    return null;
  }
  return (
    <>
      <Providers>
        <StatusBar style={colorScheme === "light" ? "dark" : "light"} />
        <Stack>
          <Stack.Screen name="auth" options={{ headerShown: false }} />
          <Stack.Screen name="(authenticated)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: "modal" }} />
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="info" options={{ headerShown: false }} />
        </Stack>
      </Providers>
    </>
  );
}
