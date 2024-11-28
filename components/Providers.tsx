import React from "react";
import { TamaguiProvider, Theme } from "tamagui";
import tamaguiConfig from "@/tamagui.config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PostHogProvider } from "posthog-react-native";
import { StatusBar } from "expo-status-bar";
import { useThemeStore } from "@/stores/useThemeStore";
import { reverseTheme } from "@/utils/theme";

const queryClient = new QueryClient({});

export function Providers({ children }: { children: React.ReactNode }) {
  const theme = useThemeStore((s) => s.theme);

  return (
    <TamaguiProvider config={tamaguiConfig}>
      <Theme name={theme}>
        <QueryClientProvider client={queryClient}>
          <PostHogProvider
            apiKey="phc_FBc5Pd4gmFrFW4hzl1rPSxiqNJytUkj30x85FXWSL8B"
            options={{
              host: "https://us.i.posthog.com",
            }}>
            <StatusBar style={reverseTheme(theme)} />
            {children}
          </PostHogProvider>
        </QueryClientProvider>
      </Theme>
    </TamaguiProvider>
  );
}
