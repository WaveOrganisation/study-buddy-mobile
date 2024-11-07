import Feather from "@expo/vector-icons/Feather";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import { usePostHog } from "posthog-react-native";
import React, { useMemo, useState } from "react";
import { Button, H2, H3, H4, H5, Input, Label, Text, View, YStack } from "tamagui";

import { theme } from "@/theme";
import { Link } from "expo-router";

const SignInBottomSheetUI = () => {
  const [user, setUser] = useState<string>("");

  const startsWithANumber = useMemo(() => {
    return /^[0-9]/.test(user);
  }, []);

  return (
    <View py="$8" px={"$4"}>
      <View gap={"$1"}>
        <H3 textAlign={"center"}>Welcome Back!</H3>
        <H5 textAlign={"center"}>Please enter your credentials to sign in your account.</H5>
      </View>
      <YStack my={"$5"} gap={"$4"}>
        <YStack gap="$1">
          <Label htmlFor="user">Username or Phone Number</Label>
          <Input
            value={user}
            onChangeText={setUser}
            id="user"
            placeholder={"052 574 4414 (yatochka)"}
            autoComplete={startsWithANumber ? "tel" : "username"}
            color={theme.SECONDARY_COLOR}
          />
        </YStack>
        <YStack gap="$1">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            secureTextEntry
            placeholder={'"Your Very Secure Password"'}
            autoComplete={startsWithANumber ? "tel" : "username"}
            color={theme.SECONDARY_COLOR}
          />
        </YStack>
        <Link href={"/auth/confirm-otp"} asChild>
          <Button themeInverse>Sign In</Button>
        </Link>
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
