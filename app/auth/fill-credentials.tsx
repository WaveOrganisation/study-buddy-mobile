import React from "react";
import {
  Button,
  H2,
  H4,
  H5,
  H6,
  Input,
  Label,
  Text,
  Unspaced,
  View,
  XStack,
  YStack,
} from "tamagui";
import { CheckCircle2 } from "@tamagui/lucide-icons";

import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import GestureGoBack from "@/components/gestureGoBack";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ControllerWithError } from "@/components/Input";
import { passwordString } from "@/shared/schema";

const fillCredentialsSchema = z
  .object({
    username: z.string().min(1).max(52).includes("skibidi"),
    fullName: z.string().min(1).max(52).includes("skibidi"),
    password: passwordString,
    passwordConfirm: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords do not match",
    path: ["passwordConfirm"],
  });
const FillCredentials = () => {
  const params = useLocalSearchParams<{ user: string }>();
  const form = useForm<z.infer<typeof fillCredentialsSchema>>({
    resolver: zodResolver(fillCredentialsSchema),
    reValidateMode: "onChange",
    mode: "all",
    defaultValues: {
      username: "",
      fullName: "",
      password: "",
      passwordConfirm: "",
    },
  });

  return (
    <>
      <GestureGoBack />

      <SafeAreaView
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          // backgroundColor: theme.PRIMARY_COLOR,
        }}>
        <YStack py="$4" px="$6">
          <YStack gap={"$2"}>
            <H2>Create your account</H2>
            <H6 textTransform={"none"} letterSpacing={"$1"} color={"$colorHover"}>
              Enter your details to complete registration
            </H6>
          </YStack>
          <YStack mt={"$5"}>
            {/*<div className="mb-6 p-3 bg-green-50 border border-green-200 rounded-md flex items-center">*/}
            {/*  <CheckCircle2 className="w-5 h-5 text-green-500 mr-2"/>*/}
            {/*  <p className="text-sm text-green-700">*/}
            {/*    Phone number confirmed: <span className="font-medium">{confirmedPhoneNumber}</span>*/}
            {/*  </p>*/}
            {/*</div>*/}
            <XStack
              p={"$3"}
              bg={"#f0fdf4"}
              borderRadius={"$2"}
              borderWidth={"$0.5"}
              borderColor={"#bbf7d0"}
              display={"flex"}
              alignItems={"center"}
              gap={"$2"}>
              <CheckCircle2 size={"$1"} color={"#4ad07b"} />
              <Text color={"$colorHover"} fontSize={"$3"}>
                Phone number confirmed:{" "}
                {!!params.user ? params.user.replaceAll(" ", "-") : "ERROR 404!"}
              </Text>
            </XStack>
            <YStack gap="$1">
              {/*<Controller*/}
              {/*  control={form.control}*/}
              {/*  rules={{ required: true }}*/}
              {/*  render={({ field: { onChange, onBlur, value }, fieldState: { invalid } }) => {*/}
              {/*    return (*/}
              {/*      <>*/}
              {/*        <LabelWithErrorState error={invalid} htmlFor="fullName">*/}
              {/*          Full Name*/}
              {/*        </LabelWithErrorState>*/}
              {/*        <InputWithErrorState*/}
              {/*          id="fullName"*/}
              {/*          placeholder={"Shlomo Ben-Yosef"}*/}
              {/*          autoComplete={"name"}*/}
              {/*          value={value}*/}
              {/*          error={invalid}*/}
              {/*          onChangeText={onChange}*/}
              {/*          onBlur={onBlur}*/}
              {/*        />*/}
              {/*      </>*/}
              {/*    );*/}
              {/*  }}*/}
              {/*  name={"fullName"}*/}
              {/*/>*/}
              <ControllerWithError
                controlProps={{
                  control: form.control,
                  name: "fullName",
                }}
                labelProps={{
                  label: "Full Name",
                }}
                inputProps={{
                  autoComplete: "name",
                  placeholder: "Shlomo Ben-Yosef",
                  id: "fullName",
                }}
              />
            </YStack>
            <YStack gap="$1">
              {/*<Input id="username" placeholder="yatochka" autoComplete={"username-new"} />*/}
              {/*<Controller*/}
              {/*  render={({ field: { onChange, onBlur, value }, fieldState: { invalid } }) => {*/}
              {/*    return (*/}
              {/*      <>*/}
              {/*        <LabelWithErrorState error={invalid} htmlFor="username">*/}
              {/*          Username*/}
              {/*        </LabelWithErrorState>*/}
              {/*        <InputWithErrorState*/}
              {/*          id="username"*/}
              {/*          placeholder="yatochka"*/}
              {/*          autoComplete={"username-new"}*/}
              {/*          error={invalid}*/}
              {/*          onChangeText={onChange}*/}
              {/*          onBlur={onBlur}*/}
              {/*          value={value}*/}
              {/*        />*/}
              {/*      </>*/}
              {/*    );*/}
              {/*  }}*/}
              {/*  name={"username"}*/}
              {/*  control={form.control}*/}
              {/*/>*/}
              <ControllerWithError
                controlProps={{
                  control: form.control,
                  name: "username",
                }}
                labelProps={{
                  label: "Username",
                }}
                inputProps={{
                  autoComplete: "username-new",
                  placeholder: "yatochka",
                  id: "username",
                }}
              />
            </YStack>
            <YStack gap="$1">
              {/*<Label htmlFor="password">Password</Label>*/}
              {/*<Input*/}
              {/*  id="password"*/}
              {/*  placeholder={"Think of a good one"}*/}
              {/*  secureTextEntry*/}
              {/*  autoComplete={"new-password"}*/}
              {/*/>*/}
              {/*<Controller*/}
              {/*  render={({ field: { onChange, onBlur, value }, fieldState: { invalid } }) => {*/}
              {/*    return (*/}
              {/*      <>*/}
              {/*        <LabelWithErrorState error={invalid} htmlFor="password">*/}
              {/*          Password*/}
              {/*        </LabelWithErrorState>*/}
              {/*        <InputWithErrorState*/}
              {/*          id="password"*/}
              {/*          placeholder={"Think of a good one"}*/}
              {/*          secureTextEntry*/}
              {/*          autoComplete={"new-password"}*/}
              {/*          error={invalid}*/}
              {/*          onChangeText={onChange}*/}
              {/*          onBlur={onBlur}*/}
              {/*          value={value}*/}
              {/*        />*/}
              {/*      </>*/}
              {/*    );*/}
              {/*  }}*/}
              {/*  name={"password"}*/}
              {/*  control={form.control}*/}
              {/*/>*/}
              <ControllerWithError
                controlProps={{
                  control: form.control,
                  name: "password",
                }}
                labelProps={{
                  label: "Password",
                }}
                inputProps={{
                  autoComplete: "new-password",
                  placeholder: "Think of a good one",
                  secureTextEntry: true,
                  id: "password",
                }}
              />
            </YStack>
            <YStack gap="$1">
              {/*<Label htmlFor="passwordConfirm">Password Confirmation</Label>*/}
              {/*<Input*/}
              {/*  id="passwordConfirm"*/}
              {/*  placeholder={"Don't make mistakes!"}*/}
              {/*  secureTextEntry*/}
              {/*  autoComplete={"new-password"}*/}
              {/*/>*/}
              {/*<Controller*/}
              {/*  render={({ field: { onChange, onBlur, value }, fieldState: { invalid } }) => {*/}
              {/*    return (*/}
              {/*      <>*/}
              {/*        <LabelWithErrorState error={invalid} htmlFor="passwordConfirm">*/}
              {/*          Password Confirmation*/}
              {/*        </LabelWithErrorState>*/}
              {/*        <InputWithErrorState*/}
              {/*          id="passwordConfirm"*/}
              {/*          placeholder={"Don't make mistakes!"}*/}
              {/*          secureTextEntry*/}
              {/*          autoComplete={"new-password"}*/}
              {/*          error={invalid}*/}
              {/*          onChangeText={onChange}*/}
              {/*          onBlur={onBlur}*/}
              {/*          value={value}*/}
              {/*        />*/}
              {/*      </>*/}
              {/*    );*/}
              {/*  }}*/}
              {/*  name={"passwordConfirm"}*/}
              {/*  control={form.control}*/}
              {/*/>*/}
              <ControllerWithError
                controlProps={{
                  control: form.control,
                  name: "passwordConfirm",
                }}
                labelProps={{
                  label: "Password Confirmation",
                }}
                inputProps={{
                  autoComplete: "new-password",
                  placeholder: "Don't make mistakes!",
                  secureTextEntry: true,
                  id: "passwordConfirm",
                }}
              />
            </YStack>
            <Button themeInverse size={"$3"} mt={"$4"}>
              Submit
            </Button>
          </YStack>
        </YStack>
      </SafeAreaView>
    </>
  );
};

export default FillCredentials;
