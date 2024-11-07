import Feather from "@expo/vector-icons/Feather";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import { usePostHog } from "posthog-react-native";
import React, { useMemo, useState } from "react";
import { Button, H2, H3, H4, H5, Input, Label, Text, View, YStack } from "tamagui";

import { theme } from "@/theme";
import { Link, useRouter } from "expo-router";
import { z } from "zod";
import { phoneNumberRegex } from "@/shared/regex";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const signInSchema = z.object({
  user: z
    .string()
    .regex(phoneNumberRegex, "Please enter a valid phone number")
    .or(z.string().min(1).max(20)),
  password: z.string().min(1).max(20),
});

const SignInBottomSheetUI = () => {
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
    router.push(`/auth/confirm-otp?phoneNumber=${data.user}&redirect=signin`);
  });

  return (
    <View py="$8" px={"$4"}>
      <View gap={"$1"}>
        <H3 textAlign={"center"}>Welcome Back!</H3>
        <H5 textAlign={"center"}>Please enter your credentials to sign in your account.</H5>
      </View>
      <YStack my={"$5"} gap={"$4"}>
        <YStack gap="$1">
          {/*<Input*/}
          {/*  value={user}*/}
          {/*  onChangeText={setUser}*/}
          {/*  id="user"*/}
          {/*  placeholder={"052 574 4414 (yatochka)"}*/}
          {/*  autoComplete={startsWithANumber ? "tel" : "username"}*/}
          {/*  color={theme.SECONDARY_COLOR}*/}
          {/*/>*/}
          <Controller
            control={form.control}
            rules={{ required: true }}
            name={"user"}
            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => {
              return (
                <>
                  <Label htmlFor="user" color={error ? "red" : "$color"}>
                    Username or Phone Number
                  </Label>
                  <Input
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    borderColor={error ? "red" : "$borderColor"}
                    id="user"
                    placeholder={"052 574 4414 (yatochka)"}
                    autoComplete={startsWithANumber ? "tel" : "username"}
                  />
                </>
              );
            }}
          />
        </YStack>
        <YStack gap="$1">
          <Controller
            control={form.control}
            rules={{ required: true }}
            name={"password"}
            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => {
              return (
                <>
                  <Label htmlFor="password" color={error ? "red" : "$color"}>
                    Password
                  </Label>

                  <Input
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    borderColor={error ? "red" : "$borderColor"}
                    id="password"
                    secureTextEntry
                    placeholder={'"Your Very Secure Password"'}
                    autoComplete={startsWithANumber ? "tel" : "username"}
                  />
                </>
              );
            }}
          />
        </YStack>
        <Button themeInverse onPress={handleSubmit}>
          Sign In
        </Button>
        <View>
          <Text color={"$colorHover"} textDecorationLine={"underline"} textAlign={"center"}>
            Forgot your password?{" "}
          </Text>
        </View>
      </YStack>
    </View>
  );
};

export default SignInBottomSheetUI;
