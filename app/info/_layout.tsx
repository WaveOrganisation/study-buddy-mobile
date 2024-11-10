import { Stack, Tabs } from "expo-router";

export default function InfoLayout({}: {}) {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="user-notice" options={{}} />
      <Stack.Screen
        name="privacy-policy"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="help"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
