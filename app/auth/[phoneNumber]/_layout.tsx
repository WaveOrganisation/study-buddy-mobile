import { Stack } from "expo-router";

export default function Layout({}) {
  return (
    <Stack>
      <Stack.Screen
        name="confirm-otp-signup"
        options={{
          title: "Auth",
          gestureEnabled: true,
        }}
      />
    </Stack>
  );
}
