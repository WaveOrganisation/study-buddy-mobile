import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { PostHogProvider } from "posthog-react-native";
import { useEffect } from "react";
import { useColorScheme } from "react-native";
import { TamaguiProvider, Theme } from "tamagui";
import tamaguiConfig from "@/tamagui.config";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "index",
};
const queryClient = new QueryClient();

SplashScreen.preventAutoHideAsync();
export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [fontLoaded] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
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
      <TamaguiProvider config={tamaguiConfig}>
        <Theme name={colorScheme === "dark" ? "dark" : "light"}>
          <QueryClientProvider client={queryClient}>
            <PostHogProvider
              apiKey="phc_FBc5Pd4gmFrFW4hzl1rPSxiqNJytUkj30x85FXWSL8B"
              options={{
                host: "https://us.i.posthog.com",
              }}>
              <StatusBar style={colorScheme === "light" ? "dark" : "light"} />
              <Stack>
                <Stack.Screen name="auth" options={{ headerShown: false }} />
                <Stack.Screen name="(authenticated)" options={{ headerShown: false }} />
                <Stack.Screen name="modal" options={{ presentation: "modal" }} />
                <Stack.Screen name="index" options={{ headerShown: false }} />
              </Stack>
            </PostHogProvider>
          </QueryClientProvider>
        </Theme>
      </TamaguiProvider>
    </>
  );
}
