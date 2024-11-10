import React from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import GestureGoBack from "@/components/gestureGoBack";

const UserNotice = () => {
  return (
    <SafeAreaView>
      <GestureGoBack />

      <Text>By signing up, you agree to our User Notice and Privacy Policy.</Text>
    </SafeAreaView>
  );
};

export default UserNotice;
