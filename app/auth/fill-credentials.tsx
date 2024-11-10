import React from "react";
import {
  Button,
  H2,
  H4,
  H5,
  H6,
  Input,
  Label,
  Text,
  Unspaced,
  View,
  XStack,
  YStack,
} from "tamagui";
import { Check, CheckCircle2 } from "@tamagui/lucide-icons";

import { SafeAreaView } from "react-native-safe-area-context";
import { theme } from "@/theme";
import { useLocalSearchParams } from "expo-router";
import GestureGoBack from "@/components/gestureGoBack";

const FillCredentials = () => {
  const params = useLocalSearchParams<{ user: string }>();
  console.log(params);
  return (
    <>
      <GestureGoBack />

      <SafeAreaView
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          // backgroundColor: theme.PRIMARY_COLOR,
        }}>
        <YStack py="$4" px="$6">
          <YStack gap={"$2"}>
            <H2>Create your account</H2>
            <H6 textTransform={"none"} letterSpacing={"$1"} color={"$colorHover"}>
              Enter your details to complete registration
            </H6>
          </YStack>
          <YStack gap={"$3"} mt={"$5"}>
            {/*<div className="mb-6 p-3 bg-green-50 border border-green-200 rounded-md flex items-center">*/}
            {/*  <CheckCircle2 className="w-5 h-5 text-green-500 mr-2"/>*/}
            {/*  <p className="text-sm text-green-700">*/}
            {/*    Phone number confirmed: <span className="font-medium">{confirmedPhoneNumber}</span>*/}
            {/*  </p>*/}
            {/*</div>*/}
            <XStack
              p={"$3"}
              bg={"#f0fdf4"}
              borderRadius={"$2"}
              borderWidth={"$0.5"}
              borderColor={"#bbf7d0"}
              display={"flex"}
              alignItems={"center"}
              gap={"$2"}>
              <CheckCircle2 size={"$1"} color={"#4ad07b"} />
              <Text color={"$colorHover"} fontSize={"$3"}>
                Phone number confirmed: {params.user.replaceAll(" ", "-")}
              </Text>
            </XStack>
            <YStack gap="$1">
              <Label htmlFor="fullName">Full Name</Label>
              <Input id="fullName" placeholder={"Shlomo Ben-Yosef"} autoComplete={"name"} />
            </YStack>
            <YStack gap="$1">
              <Label htmlFor="username">Username</Label>
              <Input id="username" placeholder="yatochka" autoComplete={"username-new"} />
            </YStack>
            <YStack gap="$1">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                placeholder={"Think of a good one"}
                secureTextEntry
                autoComplete={"new-password"}
              />
            </YStack>
            <YStack gap="$1">
              <Label htmlFor="passwordConfirm">Password Confirmation</Label>
              <Input
                id="passwordConfirm"
                placeholder={"Don't make mistakes!"}
                secureTextEntry
                autoComplete={"new-password"}
              />
            </YStack>
            <Button themeInverse size={"$3"} mt={"$4"}>
              Submit
            </Button>
          </YStack>
        </YStack>
      </SafeAreaView>
    </>
  );
};

export default FillCredentials;
