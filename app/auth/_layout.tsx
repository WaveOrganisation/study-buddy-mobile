import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Auth',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="sheet"
        options={{
          title: 'Auth',
          headerShown: false,
        }}
      />
    </Stack>
  );
}
