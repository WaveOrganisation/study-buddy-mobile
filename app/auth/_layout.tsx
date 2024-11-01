import { Redirect, Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Auth",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="confirm-otp"
        options={{
          title: "Auth",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="fill-credentials"
        options={{
          title: "Auth",
          headerShown: false,
        }}
      />
    </Stack>
  );
}
