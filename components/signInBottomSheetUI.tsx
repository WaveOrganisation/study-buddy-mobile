import React, { useMemo } from "react";
import { Button, H3, H5, Text, View, YStack } from "tamagui";

import { Link, useRouter } from "expo-router";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ControllerWithError } from "@/components/Input";
import { phoneNumberOrUsernameString, signInPasswordString } from "@/shared/schema";
import { useTranslation } from "react-i18next";

const signInSchema = z.object({
  user: phoneNumberOrUsernameString,
  password: signInPasswordString,
});

const SignInBottomSheetUI = () => {
  const { t } = useTranslation("pageOnboarding");
  const router = useRouter();

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    reValidateMode: "onChange",
    mode: "all",
    defaultValues: {
      user: "",
    },
  });

  const startsWithANumber = useMemo(() => {
    return /^[0-9]/.test(form.watch("user"));
  }, []);

  const handleSubmit = form.handleSubmit((_data) => {
    router.replace(`/(authenticated)`);
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
