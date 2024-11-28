// ConfirmOtp Component
import { getTokens } from "@tamagui/core";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, H1, H5, Stack, Text, XStack, YStack } from "tamagui";
import { OtpInput } from "react-native-otp-entry";
import { ArrowRight } from "@tamagui/lucide-icons";

export const ConfirmOtp = ({
  phoneNumber,
  onFilled,
  onResend,
}: {
  phoneNumber: string;
  onFilled: (otp: string) => void;
  onResend: () => void;
}) => {
  const tokens = getTokens();
  const [timer, setTimer] = useState(59);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  return (
    <SafeAreaView
      style={{
        backgroundColor: "white",
        flex: 1,
      }}>
      <YStack py={"$10"} px={"$4"}>
        <H1 textAlign={"center"}>Verify Your Number</H1>
        <H5 textTransform={"none"} textAlign={"center"} color={"$colorHover"}>
          We've sent a code to {phoneNumber}
        </H5>

        <YStack px={"$5"} my={"$5"} gap={"$3"}>
          <Text>Enter 4-digit code.</Text>
          <OtpInput
            numberOfDigits={4}
            hideStick
            onFilled={onFilled}
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
              <Button unstyled onPress={onResend} pressStyle={{ opacity: 0.7 }}>
                <Text color="$color" fontSize="$5" fontWeight="600">
                  Resend Code ({timer}s)
                </Text>
              </Button>
            </XStack>
          </YStack>
        </YStack>
      </YStack>
    </SafeAreaView>
  );
};
