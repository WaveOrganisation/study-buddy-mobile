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
import CustomBackdrop from "@/components/CustomBackdrop";
import SignUpBottomSheetUI from "@/components/signUpBottomSheetUI";
import { useTranslation } from "react-i18next";

function SignInButton() {
  const { t } = useTranslation("pageOnboarding");
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
        {t("buttonSignIn")}
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
  const { t } = useTranslation("pageOnboarding");
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
        {t("buttonSignUp")}
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
  const { t } = useTranslation("pageOnboarding");
  // console.log(i18n.language);
  return (
    <>
      <GestureHandlerRootView>
        <BottomSheetModalProvider>
          <SafeAreaView>
            <YStack p={"$7"} gap={"$7"}>
              <Text style={styles.titleText}>{t("title")}</Text>
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
                  {t("bySigningUp")} {"\n"}
                  <Link href={"/info/user-notice"} push asChild>
                    <Text textDecorationLine={"underline"}>{t("userNotice")}</Text>
                  </Link>{" "}
                  {t("and")}{" "}
                  <Link href={"/info/privacy-policy"} push asChild>
                    <Text textDecorationLine={"underline"}>{t("privacyPolicy")}</Text>
                  </Link>
                  .{"\n\n"}
                  <Link href={"/info/help"} push asChild>
                    <Text textDecorationLine={"underline"}>{t("cantSignIn")}</Text>
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
