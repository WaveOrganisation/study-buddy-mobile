import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { phoneNumberRegex } from "@/shared/regex";
import { Button, H3, H5, View, YStack } from "tamagui";
import { ControllerWithError } from "@/components/Input";

const signUpSchema = z.object({
  user: z.string().regex(phoneNumberRegex, "Please enter a valid phone number"),
});

const SignUpBottomSheetUI = () => {
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
        <H3 textAlign={"center"}>Create an account</H3>
        <H5 color={"$colorHover"} textTransform={"none"} textAlign={"center"}>
          We'll send a verification code to your phone number.
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
              label: "Phone Number",
            }}
            inputProps={{
              autoComplete: "tel",
              placeholder: "052 574 4414",
              id: "user",
            }}
          />
        </YStack>
        <Button themeInverse onPress={handleSubmit}>
          Sign Up
        </Button>
      </YStack>
    </View>
  );
};

export default SignUpBottomSheetUI;
