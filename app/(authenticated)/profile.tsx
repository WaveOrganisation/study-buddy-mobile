import React from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Avatar, View } from "tamagui";
import GestureGoBack from "@/components/gestureGoBack";

const Profile = () => {
  return (
    <>
      <GestureGoBack />
      <View flex={1} bg={"white"} overflow={"hidden"}>
        <View
          height="30%"
          width="100%"
          style={{
            backgroundColor: "#fff",
            shadowColor: "#000",
            shadowOffset: { width: 1, height: 1 },
            shadowOpacity: 0.4,
            shadowRadius: 3,
            elevation: 5,
          }}>
          <Avatar circular size="$10" position={"absolute"} b={-30} left={"50%"} translateX={-50}>
            <Avatar.Image
              accessibilityLabel="Cam"
              src="https://images.unsplash.com/photo-1548142813-c348350df52b?&w=150&h=150&dpr=2&q=80"
            />
            <Avatar.Fallback backgroundColor="$blue10" />
          </Avatar>
        </View>
        <Text>Profile</Text>
      </View>
    </>
  );
};

export default Profile;
