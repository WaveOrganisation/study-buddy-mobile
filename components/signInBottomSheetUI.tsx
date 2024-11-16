import Feather from "@expo/vector-icons/Feather";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import { usePostHog } from "posthog-react-native";
import React, { useMemo, useState } from "react";
import { Button, H2, H3, H4, H5, Input, Label, Text, View, YStack } from "tamagui";

import { Link, useRouter } from "expo-router";
import { z } from "zod";
import { phoneNumberRegex } from "@/shared/regex";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ControllerWithError } from "@/components/Input";
import { passwordString, phoneNumberOrUsernameString } from "@/shared/schema";
import { useTranslation } from "react-i18next";

const signInSchema = z.object({
  user: phoneNumberOrUsernameString,
  password: passwordString,
});

const SignInBottomSheetUI = () => {
  const { t } = useTranslation("pageOnboarding");
  const router = useRouter();
  const [user, setUser] = useState<string>("");

  const startsWithANumber = useMemo(() => {
    return /^[0-9]/.test(user);
  }, []);

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    reValidateMode: "onChange",
    mode: "all",
    defaultValues: {
      user: "",
    },
  });
  const handleSubmit = form.handleSubmit((data) => {
    router.push(`/(authenticated)`);
  });

  return (
    <View py="$8" px={"$4"}>
      <View gap={"$1"}>
        <H3 textAlign={"center"}>{t("signInSheetTitle")}</H3>
        <H5 textAlign={"center"} color={"$colorHover"} textTransform={"none"}>
          {t("signInSheetMessage")}
        </H5>
      </View>
      <YStack my={"$5"} gap={"$4"}>
        <YStack gap={"$1"}>
          <YStack gap="$1">
            <ControllerWithError
              controlProps={{
                control: form.control,
                name: "user",
              }}
              labelProps={{
                label: t("userFieldLabel"),
              }}
              inputProps={{
                autoComplete: startsWithANumber ? "tel" : "username",
                placeholder: t("userFieldPlaceholder"),
                id: "user",
              }}
            />
          </YStack>
          <YStack gap="$1">
            <ControllerWithError
              controlProps={{
                control: form.control,
                name: "password",
              }}
              labelProps={{
                label: t("passwordFieldLabel"),
              }}
              inputProps={{
                autoComplete: "password",
                placeholder: t("passwordFieldPlaceholder"),
                secureTextEntry: true,
                id: "password",
              }}
            />
          </YStack>
        </YStack>
        <Button themeInverse onPress={handleSubmit}>
          {t("buttonSignIn")}
        </Button>
        <Link href={"/auth/password-recovery"} push asChild>
          <Text color={"$colorHover"} textDecorationLine={"underline"} textAlign={"center"}>
            {t("forgotPassword")}{" "}
          </Text>
        </Link>
      </YStack>
    </View>
  );
};

export default SignInBottomSheetUI;
