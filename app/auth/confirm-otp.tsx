import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState, useEffect, useMemo } from "react";
import { Vibration, Alert } from "react-native";
import { Button, H1, H2, H3, H5, H6, Stack, Text, View, XStack, YStack } from "tamagui";
import { SafeAreaView } from "react-native-safe-area-context";
import { OtpInput } from "react-native-otp-entry";
import { getTokens, getConfig } from "@tamagui/core";
import { ArrowRight } from "@tamagui/lucide-icons";
import GestureGoBack from "@/components/gestureGoBack";

const Page = () => {
  const paramsLocal = useLocalSearchParams<{
    phoneNumber: string;
    redirect: "signup" | "signin";
  }>();

  useEffect(() => {
    console.log(paramsLocal);
  }, []);
  const router = useRouter();
  const [timer, setTimer] = useState(59);
  const [isCodeResent, setIsCodeResent] = useState(false);
  // Timer for resend button
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer(timer - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  // Function to handle OTP submission
  const handleOtpFilled = (enteredOtp: string) => {
    if (enteredOtp === "123456") {
      // Alert.alert('Success', 'OTP verified successfully!');

      if (paramsLocal.redirect == "signin") {
        router.replace("/home");
      } else if (paramsLocal.redirect === "signup") {
        router.replace(`/auth/fill-credentials?user=${paramsLocal.phoneNumber}`);
      } else {
        Alert.alert("There was an unexpected error");
      }
    } else {
      Vibration.vibrate(500); // Vibrate on incorrect OTP
      Alert.alert("Error", "Incorrect OTP. Please try again.");
    }
  };

  // Handle resend code action
  const handleResendCode = () => {
    setIsCodeResent(true);
    setTimer(59);
    Alert.alert("Code Resent", "A new code has been sent to your phone.");
  };
  const tokens = getTokens();
  console.log(tokens.color.$gray8Light.val);
  return (
    <>
      <GestureGoBack />
      <SafeAreaView
        style={{
          backgroundColor: "white",
          flex: 1,
        }}>
        <YStack py={"$10"} px={"$4"}>
          <H1 textAlign={"center"}>Verify Your Number</H1>
          <H5 textTransform={"none"} textAlign={"center"} color={"$colorHover"}>
            We've sent a code to {paramsLocal.phoneNumber ?? "052 574 4414"}
          </H5>

          <YStack px={"$5"} my={"$5"} gap={"$3"}>
            <Text>Enter 6-digit code.</Text>
            <OtpInput
              hideStick
              theme={{
                pinCodeContainerStyle: {
                  borderRadius: 5,
                  borderColor: tokens.color.$gray8Light.val,
                },
                focusStickStyle: {
                  borderColor: tokens.color.$gray8Dark.val,
                },
                focusedPinCodeContainerStyle: {
                  borderColor: tokens.color.$gray8Dark.val,
                },
              }}></OtpInput>

            <XStack alignItems={"center"} display={"flex"} mx={"auto"} my={"$2.5"}>
              <ArrowRight color={"$colorHover"} size={"$1"} />
              <Text textAlign={"center"} color={"$colorHover"} fontSize={"$5"}>
                Code will be verified automatically.
              </Text>
            </XStack>
            <YStack gap="$4">
              <Stack position="relative" height="$1">
                <Stack
                  position="absolute"
                  left={0}
                  right={0}
                  top="50%"
                  height="$0.25"
                  backgroundColor="$gray8"
                />
                <XStack justifyContent="center" alignItems={"center"}>
                  <Text
                    color="$gray11"
                    fontSize="$2"
                    backgroundColor="$background"
                    paddingHorizontal="$2"
                    mt={"$1"}>
                    Didn't receive the code?
                  </Text>
                </XStack>
              </Stack>
              <XStack justifyContent="center">
                <Button
                  unstyled
                  onPress={() => console.log("Resend code")}
                  pressStyle={{ opacity: 0.7 }}>
                  <Text color="$color" fontSize="$5" fontWeight="600">
                    Resend Code
                  </Text>
                </Button>
              </XStack>
            </YStack>
          </YStack>
        </YStack>
      </SafeAreaView>
    </>
  );
};

export default Page;
