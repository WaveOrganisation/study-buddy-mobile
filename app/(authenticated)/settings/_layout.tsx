// stack layout
import { Stack } from "expo-router";
import { useTranslation } from "react-i18next";

export default function Layout() {
  const { t } = useTranslation("pageSettings");
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: t("title"),
          // headerStyle: {},
          headerTitleAlign: "center",
          presentation: "modal",

          // headerShown: false,
          gestureEnabled: true,
          headerBackButtonMenuEnabled: true,
        }}
      />
    </Stack>
  );
}
