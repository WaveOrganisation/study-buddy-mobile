import { Label, Separator, SizeTokens, Switch, XStack } from "tamagui";
import { MoonStar } from "@tamagui/lucide-icons";
import { Platform } from "react-native";
import React from "react";
import { useTranslation } from "react-i18next";
import useRTL from "@/hooks/useRTL";

export function SwitchWithLabel({
  label,
  isChecked,
  onChange,
  labelSize,
  size,
}: {
  label: string;
  size: SizeTokens;
  isChecked: boolean;
  onChange: () => void;
  labelSize?: SizeTokens;
}) {
  const id = `switch-${size.toString().slice(1)}-${isChecked}`;
  const isRTL = useRTL();

  return (
    <XStack
      width={"100%"}
      alignItems="center"
      justifyContent="space-between"
      flexDirection={isRTL ? "row-reverse" : "row"}>
      <XStack alignItems={"center"} gap={"$3"} flexDirection={isRTL ? "row-reverse" : "row"}>
        <MoonStar size={"$2.5"} />
        <Label
          display="flex"
          paddingRight="$0"
          minWidth={90}
          justifyContent="flex-end"
          size={!!labelSize ? labelSize : size}
          htmlFor={id}>
          {label}
        </Label>
      </XStack>
      <Separator minHeight={20} vertical />
      <Switch
        id={id}
        size={size}
        checked={isChecked}
        onCheckedChange={onChange}
        native={Platform.OS === "ios"}
        style={{
          backgroundColor: isChecked ? "black" : "#e4e4e7",
        }}>
        <Switch.Thumb backgroundColor={"#fff"} animation="bouncy" />
      </Switch>
    </XStack>
  );
}