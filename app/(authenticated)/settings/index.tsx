import React from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { H1, H2, View } from "tamagui";
import GeneralSettings from "@/components/settings/GeneralSettings";
import { useTranslation } from "react-i18next";

const SettingsSection = ({ title, children }: { title: string; children: React.ReactNode }) => {
  return (
    <View my={"$5"}>
      <H2 color={"$colorHover"} mb={"$3"}>
        {title}
      </H2>

      <View>{children}</View>
    </View>
  );
};

const Settings = () => {
  const { t } = useTranslation("pageSettings");
  return (
    <SafeAreaView>
      <View bc="#fff" px={"$5"} py={"$5"}>
        <H1>{t("title")}</H1>

        <SettingsSection title={t("section1Title")}>
          <GeneralSettings />
        </SettingsSection>
      </View>
    </SafeAreaView>
  );
};

export default Settings;
