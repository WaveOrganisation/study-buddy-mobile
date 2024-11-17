import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Auth",
          gestureEnabled: true,
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="fill-credentials"
        options={{
          title: "Auth",
          gestureEnabled: true,
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="password-recovery"
        options={{
          presentation: "modal",
          gestureEnabled: true,
          title: "Auth",
          // headerShown: false,
        }}
      />
    </Stack>
  );
}
