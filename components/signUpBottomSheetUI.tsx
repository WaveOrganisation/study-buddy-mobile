import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button, H3, H5, View, YStack } from "tamagui";
import { ControllerWithError } from "@/components/Input";
import { useTranslation } from "react-i18next";
import { phoneNumberString } from "@/shared/schema";
import { useMutation } from "@tanstack/react-query";
import { mutate } from "@/utils/api";
import { ApiRoutes } from "@/utils/endpoints";

const signUpSchema = z.object({
  user: phoneNumberString,
});

const SignUpBottomSheetUI = () => {
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async (phoneNumber: string) => {
      return await mutate<{ confirmationCode: string }>(ApiRoutes.RequestOtp, "POST", {
        phoneNumber,
      });
    },
    onSuccess: async (data, phoneNumber) => {
      console.log(data.data.confirmationCode);
      router.push({
        pathname: "/auth/[phoneNumber]/confirm-otp-signup",
        params: { phoneNumber: phoneNumber },
      });
    },
  });
  const { t } = useTranslation("pageOnboarding");

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    reValidateMode: "onChange",
    mode: "all",
    defaultValues: {
      user: "",
    },
  });
  const handleSubmit = form.handleSubmit((data) => {
    mutation.mutate(data.user);
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
