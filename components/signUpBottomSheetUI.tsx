import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";

import { phoneNumberRegex } from "@/shared/regex";
import { Button, H3, H5, Input, Label, View, YStack } from "tamagui";

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
          <Controller
            control={form.control}
            rules={{ required: true }}
            name={"user"}
            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => {
              return (
                <>
                  <Label htmlFor="user" color={error ? "red" : "$color"}>
                    Phone Number
                  </Label>
                  <Input
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    borderColor={error ? "red" : "$borderColor"}
                    id="user"
                    placeholder={"052 574 4414"}
                    autoComplete={"tel"}
                  />
                </>
              );
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
