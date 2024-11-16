import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Adapt, getFontSize, Select, Sheet, View, YStack } from "tamagui";
import { Check, ChevronDown, ChevronUp } from "@tamagui/lucide-icons";
import { Platform } from "react-native";
import { useTranslation } from "react-i18next";
import useLocalization, { languages } from "@/hooks/useLocalization";

// Actions

// const switchLanguage = (to: locales) => {
//   // TODO: Implement switch language
// };
//
// const switchTheme = (to: "light" | "dark") => {
//   // TODO: Implement switch theme
// };
//
// const switchNotifications = (to: "on" | "off") => {
//   // TODO: Implement switch notifications
// };

const GeneralSettings = () => {
  const localization = useLocalization();

  return (
    <View>
      <Select value={"en"} onValueChange={localization.switchLanguage}>
        <Select.Trigger width={""} iconAfter={ChevronDown}>
          <Select.Value>{localization.language.localizedName}</Select.Value>
        </Select.Trigger>

        <Adapt when="sm" platform="touch">
          <Sheet
            modal
            native={Platform.OS === "ios"}
            dismissOnSnapToBottom
            animationConfig={{
              type: "spring",
              damping: 20,
              mass: 1.2,
              stiffness: 250,
            }}>
            <Sheet.Frame>
              <Sheet.ScrollView>
                <Adapt.Contents />
              </Sheet.ScrollView>
            </Sheet.Frame>
            <Sheet.Overlay
              animation="lazy"
              enterStyle={{ opacity: 0 }}
              exitStyle={{ opacity: 0 }}
            />
          </Sheet>
        </Adapt>

        <Select.Content zIndex={200000}>
          <Select.ScrollUpButton
            alignItems="center"
            justifyContent="center"
            position="relative"
            width="100%"
            height="$3">
            <YStack zIndex={10}>
              <ChevronUp size={20} />
            </YStack>
          </Select.ScrollUpButton>

          <Select.Viewport minWidth={200}>
            <Select.Group>
              <Select.Label>Language</Select.Label>
              {React.useMemo(
                () =>
                  languages.map((item, i) => {
                    return (
                      <Select.Item index={i} key={item.name} value={item.code}>
                        <Select.ItemText>{`${item.localizedName} (${item.name})`}</Select.ItemText>
                        <Select.ItemIndicator marginLeft="auto">
                          <Check size={16} />
                        </Select.ItemIndicator>
                      </Select.Item>
                    );
                  }),
                [languages]
              )}
            </Select.Group>
          </Select.Viewport>

          <Select.ScrollDownButton
            alignItems="center"
            justifyContent="center"
            position="relative"
            width="100%"
            height="$3">
            <YStack zIndex={10}>
              <ChevronDown size={20} />
            </YStack>
          </Select.ScrollDownButton>
        </Select.Content>
      </Select>
    </View>
  );
};

export default GeneralSettings;
