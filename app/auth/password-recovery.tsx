import React from "react";
import { Button, H1, H3, H4, Input, Label, Text, View, YStack } from "tamagui";
import { SafeAreaView } from "react-native-safe-area-context";
import { z } from "zod";
import { phoneNumberRegex } from "@/shared/regex";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { ArrowRight } from "@tamagui/lucide-icons";
import { Link } from "expo-router";
import GestureGoBack from "@/components/gestureGoBack";

const passwordRecoverySchema = z.object({
  user: z.string().regex(phoneNumberRegex, "Please enter a valid phone number"),
});

const PasswordRecoveryScreen = () => {
  const form = useForm<z.infer<typeof passwordRecoverySchema>>({
    resolver: zodResolver(passwordRecoverySchema),
    reValidateMode: "onChange",
    mode: "all",
    defaultValues: {
      user: "",
    },
  });

  return (
    <>
      <GestureGoBack />

      <View bg={"white"} flex={1}>
        <YStack p={"$7"} gap={"$7"}>
          <YStack gap={"$5"}>
            <H1 textAlign={"center"}>Account Recovery</H1>
            <H4 textAlign={"center"} fontWeight={400} color={"$colorHover"}>
              Enter your phone number to reset your password.
            </H4>
            <YStack gap="$1">
              <Controller
                control={form.control}
                rules={{ required: true }}
                name={"user"}
                render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => {
                  return (
                    <>
                      <Label htmlFor="fullName" color={error ? "red" : "$color"}>
                        Phone Number
                      </Label>

                      <Input
                        onChangeText={onChange}
                        onBlur={onBlur}
                        value={value}
                        id="fullName"
                        borderColor={error ? "red" : "$borderColor"}
                        placeholder={"052 574 4414"}
                        autoComplete={"name"}
                      />
                    </>
                  );
                }}
              />
            </YStack>
            <Button themeInverse onPress={() => {}} iconAfter={<ArrowRight />}>
              Send Recovery Code
            </Button>
            <Link href={"/auth"} asChild>
              <Text color={"$colorHover"} textAlign={"center"}>
                Remembered your password?
              </Text>
            </Link>
          </YStack>
        </YStack>
      </View>
    </>
    // </SafeAreaView>
  );
};

export default PasswordRecoveryScreen;
