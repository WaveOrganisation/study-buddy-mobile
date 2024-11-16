import React, { memo, useState } from "react";
import { XStack } from "tamagui";
import { SwitchWithLabel } from "@/components/SwitchWithLabel";
import { useTranslation } from "react-i18next";

export const DarkModeSwitch = memo(() => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { t } = useTranslation("pageSettings");
  return (
    <XStack width={"100%"}>
      <SwitchWithLabel
        label={t("darkMode")}
        labelSize={"$5"}
        size="$3"
        isChecked={isDarkMode}
        onChange={() => setIsDarkMode(!isDarkMode)}
      />
    </XStack>
  );
});
