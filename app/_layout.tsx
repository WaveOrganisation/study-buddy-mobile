import '../global.css';

import { Stack } from 'expo-router';
import { useColorScheme } from 'nativewind';
import { StatusBar } from 'expo-status-bar';
import { PostHogProvider } from 'posthog-react-native';
import { useEffect } from 'react';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: 'index',
};

export default function RootLayout() {
  const { setColorScheme, colorScheme } = useColorScheme();
  // setColorScheme('light');
  useEffect(() => {
    setColorScheme('light');
  }, []);
  return (
    <>
      <PostHogProvider
        apiKey="phc_FBc5Pd4gmFrFW4hzl1rPSxiqNJytUkj30x85FXWSL8B"
        options={{
          host: 'https://us.i.posthog.com',
        }}>
        <StatusBar style={colorScheme == 'light' ? 'dark' : 'light'} />
        <Stack>
          <Stack.Screen name="auth" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
          <Stack.Screen name="index" options={{ headerShown: false }} />
        </Stack>
      </PostHogProvider>
    </>
  );
}
