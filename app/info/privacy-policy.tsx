import React from "react";
import { Text } from "tamagui";
import { SafeAreaView } from "react-native-safe-area-context";
import GestureGoBack from "@/components/gestureGoBack";

const PrivacyPolicy = () => {
  return (
    <SafeAreaView>
      <GestureGoBack />

      <Text textAlign={"center"}>PrivacyPolicy</Text>
    </SafeAreaView>
  );
};

export default PrivacyPolicy;
