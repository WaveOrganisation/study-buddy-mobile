import React from "react";
import { H1, H2, H3, Text, YStack, ScrollView } from "tamagui";
import { SafeAreaView } from "react-native-safe-area-context";
import GestureGoBack from "@/components/gestureGoBack";
import { useTranslation } from "react-i18next";
import { SUPPORT_EMAIL } from "@/utils/const";

const PrivacyPolicy = () => {
  const { t } = useTranslation("pagePrivacyPolicy");

  return (
    <SafeAreaView>
      <ScrollView>
        <GestureGoBack />

        <YStack padding="$4" gap="$4">
          {/* Title */}
          <H1 textAlign="center">{t("title")}</H1>

          {/* Introduction Section */}
          <YStack gap="$2">
            <H2>{t("section1Title")}</H2>
            <Text>{t("section1Content")}</Text>
          </YStack>

          {/* Data We Collect Section */}
          <YStack gap="$2">
            <H2>{t("section2Title")}</H2>
            <Text>{t("section2Content")}</Text>

            <H3>{t("personalInfoTitle")}</H3>
            <Text>{t("personalInfoContent")}</Text>

            <H3>{t("usageDataTitle")}</H3>
            <Text>{t("usageDataContent")}</Text>

            <H3>{t("deviceDataTitle")}</H3>
            <Text>{t("deviceDataContent")}</Text>
          </YStack>

          {/* How We Use Your Data Section */}
          <YStack gap="$2">
            <H2>{t("section3Title")}</H2>
            <Text>{t("section3Content")}</Text>

            <YStack space="$2" paddingLeft="$2">
              <Text>• {t("useData1")}</Text>
              <Text>• {t("useData2")}</Text>
              <Text>• {t("useData3")}</Text>
              <Text>• {t("useData4")}</Text>
              <Text>• {t("useData5")}</Text>
            </YStack>
          </YStack>

          {/* Data Sharing Section */}
          <YStack gap="$2">
            <H2>{t("section4Title")}</H2>
            <Text>{t("section4Content")}</Text>

            <H3>{t("sharing1Title")}</H3>
            <Text>{t("sharing1Content")}</Text>

            <H3>{t("sharing2Title")}</H3>
            <Text>{t("sharing2Content")}</Text>
          </YStack>

          {/* Security Section */}
          <YStack gap="$2">
            <H2>{t("section5Title")}</H2>
            <Text>{t("section5Content")}</Text>
          </YStack>

          {/* Your Rights Section */}
          <YStack gap="$2">
            <H2>{t("section6Title")}</H2>
            <Text>{t("section6Content")}</Text>

            <YStack space="$2" paddingLeft="$2">
              <Text>• {t("right1")}</Text>
              <Text>• {t("right2")}</Text>
              <Text>• {t("right3")}</Text>
            </YStack>

            <Text>{t("exerciseRightsContent")}</Text>
          </YStack>

          {/* Changes to This Policy Section */}
          <YStack gap="$2">
            <H2>{t("section7Title")}</H2>
            <Text>{t("section7Content")}</Text>
          </YStack>

          {/* Contact Us Section */}
          <YStack gap="$2">
            <H2>{t("section8Title")}</H2>
            <Text>{t("section8Content", { email: SUPPORT_EMAIL })}</Text>
          </YStack>
        </YStack>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PrivacyPolicy;
