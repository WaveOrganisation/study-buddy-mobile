import React from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const UserNotice = () => {
  return (
    <SafeAreaView>
      <Text>By signing up, you agree to our User Notice and Privacy Policy.</Text>
    </SafeAreaView>
  );
};

export default UserNotice;
