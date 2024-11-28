import { z } from "zod";
import {
  hasDigit,
  hasLowercase,
  hasSpecialChar,
  hasUppercase,
  phoneNumberRegex,
  usernameRegex,
} from "@/shared/regex";
import i18next from "i18next";

const passwordLength = i18next.t("password_length", { ns: "validation" });
const passwordLengthMax = i18next.t("password_length_max", { ns: "validation" });
const passwordContainsLowercase = i18next.t("password_contains_lowercase", {
  ns: "validation",
});
const passwordContainsUppercase = i18next.t("password_contains_uppercase", {
  ns: "validation",
});
const passwordContainsDigit = i18next.t("password_contains_digit", { ns: "validation" });
const passwordContainsSpecialChar = i18next.t("password_contains_special_char", {
  ns: "validation",
});

export const passwordString = z
  .string()
  .min(8, passwordLength)
  .max(64, passwordLengthMax)
  .refine((val) => hasLowercase.test(val), {
    message: passwordContainsLowercase,
  })
  .refine((val) => hasUppercase.test(val), {
    message: passwordContainsUppercase,
  })
  .refine((val) => hasDigit.test(val), {
    message: passwordContainsDigit,
  })
  .refine((val) => hasSpecialChar.test(val), {
    message: passwordContainsSpecialChar,
  });

export const signInPasswordString = z.string();

export const phoneNumberString = z
  .string()
  .regex(phoneNumberRegex, i18next.t("phone", { ns: "validation" }));
export const phoneNumberOrUsernameString = phoneNumberString.or(
  z
    .string()
    .min(3, i18next.t("minLength", { ns: "validation", length: 3 }))
    .max(20, i18next.t("maxLength", { ns: "validation", length: 20 }))
    .regex(usernameRegex, i18next.t("phoneOrUsername", { ns: "validation" }))
);
