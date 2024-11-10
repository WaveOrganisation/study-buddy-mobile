import { ValidationKeys } from "@/i18n/resources/types";

const Validation_HE = {
  required: "שדה זה הינו שדה חובה",
  minLength: "שדה זה חייב להכיל לפחות {{length}} תווים",
  maxLength: "שדה זה חייב להכיל לכל היותר {{length}} תווים",
  minValue: "שדה זה חייב להיות לפחות {{min}}",
  maxValue: "שדה זה חייב להיות לכל היותר {{max}}",
  number: "שדה זה חייב להיות מספר",
  email: "שדה זה חייב להיות כתובת דואר אלקטרוני",
  username: "שדה זה חייב להיות שם משתמש",
  phone: "שדה זה חייב להיות מספר טלפון",
  phoneOrUsername: "שדה זה חייב להיות מספר טלפון או שם משתמש",
  password_contains_lowercase: "שדה זה חייב להכיל לפחות אות קטנה",
  password_contains_uppercase: "שדה זה חייב להכיל לפחות אות גדולה",
  password_contains_digit: "שדה זה חייב להכיל לפחות אות ספרה",
  password_contains_special_char: "שדה זה חייב להכיל לפחות אות תו מיוחד",
  password_length: "שדה זה חייב להכיל לפחות 8 תווים",
  password_length_max: "שדה זה חייב להכיל לכל היותר 64 תווים",
  password_match: "הסיסמאות חייבת להתאים",
} satisfies ValidationKeys;

export default Validation_HE;
