import React, { memo, useState } from "react";
import { XStack } from "tamagui";
import { SwitchWithLabel } from "@/components/SwitchWithLabel";
import { useTranslation } from "react-i18next";
import { useThemeStore } from "@/stores/useThemeStore";

export const DarkModeSwitch = memo(() => {
  const theme = useThemeStore();
  const { t } = useTranslation("pageSettings");
  return (
    <XStack width={"100%"}>
      <SwitchWithLabel
        label={t("darkMode")}
        labelSize={"$5"}
        size="$3"
        isChecked={theme.theme === "dark"}
        onChange={theme.switchTheme}
      />
    </XStack>
  );
});
