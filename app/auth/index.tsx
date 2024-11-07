import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
  useBottomSheetModal,
} from "@gorhom/bottom-sheet";
import { useFonts } from "expo-font";
import { Image } from "expo-image";
import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { BackHandler, StyleSheet, TouchableOpacity } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

import { Button, H1, Text, View, YStack } from "tamagui";
import { Link, useRouter } from "expo-router";
import { usePostHog } from "posthog-react-native";
import SignInBottomSheetUI from "@/components/signInBottomSheetUI";
import { theme } from "@/theme";
import CustomBackdrop from "@/components/CustomBackdrop";
import SignUpBottomSheetUI from "@/components/signUpBottomSheetUI";

function SignInButton() {
  const posthog = usePostHog();
  const signInSnapPoints = useMemo(() => ["62%"], []);
  // const confirmOTPSnapPoints = useMemo(() => ['25%'], []);
  const signInSheetRef = useRef<BottomSheetModal>(null);
  // const confirmOTPSheetRef = useRef<BottomSheetModal>(null);
  const handleSignInPresentPress = useCallback(() => {
    signInSheetRef.current?.present();
    posthog.capture("Sign In Pressed");
  }, []);
  const router = useRouter();

  const bottomSheet = useBottomSheetModal();

  useEffect(() => {
    const backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
      // signInSheetRef.current?.forceClose();
      bottomSheet.dismissAll();
      return true;
    });

    return () => {
      backHandler.remove();
    };
  }, []);

  return (
    <>
      <Button onPress={handleSignInPresentPress} themeInverse>
        Sign In
      </Button>
      <BottomSheetModal
        backdropComponent={CustomBackdrop}
        ref={signInSheetRef}
        index={1}
        snapPoints={signInSnapPoints}
        enablePanDownToClose>
        <BottomSheetView>
          <SignInBottomSheetUI />
        </BottomSheetView>
      </BottomSheetModal>
    </>
  );
}
function SignUpButton() {
  const router = useRouter();
  const posthog = usePostHog();
  const signUpSnapPoints = useMemo(() => ["45%"], []);
  // const confirmOTPSnapPoints = useMemo(() => ['25%'], []);
  const signUpSheetRef = useRef<BottomSheetModal>(null);
  // const confirmOTPSheetRef = useRef<BottomSheetModal>(null);
  const handleSignInPresentPress = useCallback(() => {
    signUpSheetRef.current?.present();
    posthog.capture("Sign Up Pressed");
  }, []);
  const bottomSheet = useBottomSheetModal();

  useEffect(() => {
    const backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
      // signInSheetRef.current?.forceClose();
      bottomSheet.dismissAll();
      return true;
    });

    return () => {
      backHandler.remove();
    };
  }, []);
  return (
    <>
      <Button onPress={handleSignInPresentPress} borderColor={"black"}>
        Sign Up
      </Button>
      <BottomSheetModal
        backdropComponent={CustomBackdrop}
        ref={signUpSheetRef}
        index={1}
        snapPoints={signUpSnapPoints}
        enablePanDownToClose>
        <BottomSheetView>
          <SignUpBottomSheetUI />
        </BottomSheetView>
      </BottomSheetModal>
    </>
  );
}

export default function OnboardingScreen() {
  return (
    <>
      <GestureHandlerRootView>
        <BottomSheetModalProvider>
          <SafeAreaView>
            <YStack p={"$7"} gap={"$7"}>
              <Text style={styles.titleText}>StudyBuddy</Text>
              <View>
                <Image
                  style={{
                    width: "100%",
                    height: 400,
                  }}
                  source={require("assets/images/background-onboarding-no-clouds.png")}
                  contentFit="contain"></Image>
              </View>
              <YStack gap={"$3"}>
                <SignInButton />
                {/*<Button borderColor={"black"}>Sign Up</Button>*/}
                {/*<Button borderColor={"black"}>Sign Up</Button>*/}
                <SignUpButton />
              </YStack>
              <View>
                <Text textAlign={"center"}>
                  By Signing Up, you agree to our {"\n"}
                  <Link href={"/info/user-notice"} push asChild>
                    <Text textDecorationLine={"underline"}>User Notice</Text>
                  </Link>{" "}
                  and{" "}
                  <Link href={"/info/privacy-policy"} push asChild>
                    <Text textDecorationLine={"underline"}>Privacy Policy</Text>
                  </Link>
                  .{"\n\n"}
                  <Link href={"/info/help"} push asChild>
                    <Text textDecorationLine={"underline"}>Can't sign in or sign up?</Text>
                  </Link>
                </Text>
              </View>
            </YStack>
          </SafeAreaView>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </>
  );
}

const styles = StyleSheet.create({
  titleText: {
    fontSize: 60,
    letterSpacing: 6,
    textAlign: "center",
    fontFamily: "Londrina-Sketch",
  },
});
