import React from "react";
import { Text } from "tamagui";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import GestureGoBack from "@/components/gestureGoBack";

const Help = () => {
  return (
    <SafeAreaView>
      <GestureGoBack />

      <Text textAlign={"center"}>Help</Text>
    </SafeAreaView>
  );
};

export default Help;
