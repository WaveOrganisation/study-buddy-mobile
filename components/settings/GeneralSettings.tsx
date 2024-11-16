import React from "react";
import { Separator, YStack } from "tamagui";
import LanguageSelector from "./LanguageSelector";
import { DarkModeSwitch } from "@/components/settings/DarkModeSwitch";
import { NotificationsSwitch } from "@/components/settings/NotificationsSwitch";

const GeneralSettings = () => {
  return (
    <YStack>
      <LanguageSelector />
      <Separator width={"100%"} my={"$3"} />
      <DarkModeSwitch />
      <Separator width={"100%"} my={"$3"} />
      <NotificationsSwitch />
    </YStack>
  );
};

export default GeneralSettings;
