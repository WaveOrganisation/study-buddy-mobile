import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { phoneNumberRegex } from "@/shared/regex";
import { Button, H3, H5, View, YStack } from "tamagui";
import { ControllerWithError } from "@/components/Input";
import { useTranslation } from "react-i18next";
import { phoneNumberString } from "@/shared/schema";

const signUpSchema = z.object({
  user: phoneNumberString,
});

const SignUpBottomSheetUI = () => {
  const { t } = useTranslation("pageOnboarding");
  const router = useRouter();

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    reValidateMode: "onChange",
    mode: "all",
    defaultValues: {
      user: "",
    },
  });
  const handleSubmit = form.handleSubmit((data) => {
    router.push(`/auth/confirm-otp?phoneNumber=${data.user}&redirect=signup`);
  });

  return (
    <View py="$8" px={"$4"}>
      <View gap={"$1"}>
        <H3 textAlign={"center"}>{t("signUpSheetTitle")}</H3>
        <H5 color={"$colorHover"} textTransform={"none"} textAlign={"center"}>
          {t("signUpSheetMessage")}
        </H5>
      </View>
      <YStack my={"$5"} gap={"$4"}>
        <YStack gap="$1">
          <ControllerWithError
            controlProps={{
              control: form.control,
              name: "user",
            }}
            labelProps={{
              label: t("phoneFieldLabel"),
            }}
            inputProps={{
              autoComplete: "tel",
              placeholder: "052 574 4414",
              id: "user",
            }}
          />
        </YStack>
        <Button themeInverse onPress={handleSubmit}>
          {t("buttonSignUp")}
        </Button>
      </YStack>
    </View>
  );
};

export default SignUpBottomSheetUI;
