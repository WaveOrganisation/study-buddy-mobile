import "react-native-gesture-handler";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { PostHogProvider } from "posthog-react-native";
import { useEffect, useMemo } from "react";
import { useColorScheme } from "react-native";
import { TamaguiProvider, Theme } from "tamagui";
import tamaguiConfig from "@/tamagui.config";
import GestureGoBack from "@/components/gestureGoBack";
import "../i18n/i18n";
import { Providers } from "@/components/Providers";
export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "index",
};
const queryClient = new QueryClient();

// SplashScreen.preventAutoHideAsync();
export default function RootLayout() {
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
