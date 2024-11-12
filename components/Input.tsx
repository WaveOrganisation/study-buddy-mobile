import React from "react";
import { Text } from "tamagui";
import { SafeAreaView } from "react-native-safe-area-context";
import { Input, InputProps, Label, LabelProps } from "tamagui";
import { Controller, ControllerProps } from "react-hook-form";
import useRTL from "@/hooks/useRTL";

type InputPropsWithError = InputProps & {
  error?: boolean;
};

type LabelPropsWithError = LabelProps & {
  error?: boolean;
};

const errorColor = "red";
const errorFocusedColor = "$red10";

const LabelWithErrorState = ({ error, ...props }: LabelPropsWithError) => {
  return <Label {...props} color={error ? errorColor : "$color"} />;
};

const InputWithErrorState = ({ error, ...props }: InputPropsWithError) => {
  return (
    <Input
      {...props}
      placeholderTextColor={error ? "red" : "$colorHover"}
      borderColor={error ? errorColor : "$borderColor"}
      focusStyle={{
        borderColor: error ? errorFocusedColor : "$borderColorFocus",
        color: error ? errorColor : "$color",
        placeholderTextColor: error ? errorColor : "$color",
      }}
    />
  );
};

const ControllerWithError = ({
  controlProps,
  inputProps,
  labelProps,
}: {
  controlProps: {
    control: ControllerProps["control"] | any;
    name: ControllerProps["name"];
  };
  inputProps: InputPropsWithError;
  labelProps: {
    label: string;
  } & LabelPropsWithError;
}) => {
  const isRTL = useRTL();
  return (
    <>
      <Controller
        name={controlProps.name}
        control={controlProps.control}
        render={({ field: { onChange, onBlur, value }, fieldState: { invalid, error } }) => {
          return (
            <>
              <LabelWithErrorState error={invalid} htmlFor={inputProps.id} {...labelProps}>
                {labelProps.label}
              </LabelWithErrorState>
              <InputWithErrorState
                {...inputProps}
                error={invalid}
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                direction={isRTL ? "rtl" : "ltr"}
              />
              {invalid ? (
                <Text ml={"$3"} color={errorColor}>
                  {error?.message}
                </Text>
              ) : (
                <Text ml={"$3"} color={"$colorHover"} opacity={0}>
                  Easter egg
                </Text>
              )}
            </>
          );
        }}
      />
    </>
  );
};

export { ControllerWithError, LabelWithErrorState, InputWithErrorState };
