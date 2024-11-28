import { ValidationKeys } from "@/i18n/resources/types";

const Validation_RU = {
  required: "Это поле обязательно для заполнения",
  minLength: "Это поле должно содержать не менее {{length}} символов",
  maxLength: "Это поле должно содержать не более {{length}} символов",
  minValue: "Это поле должно быть не менее {{min}}",
  maxValue: "Это поле должно быть не более {{max}}",
  number: "Это поле должно быть числом",
  email: "Это поле должно быть действительным адресом электронной почты",
  username: "Это поле должно быть действительным именем пользователя",
  phone: "Это поле должно быть действительным номером телефона",
  phoneOrUsername: "Это поле должно быть действительным номером телефона или именем пользователя",
  password_contains_lowercase: "Это поле должно содержать как минимум одну строчную букву",
  password_contains_uppercase: "Это поле должно содержать как минимум одну прописную букву",
  password_contains_digit: "Это поле должно содержать как минимум одну цифру",
  password_contains_special_char: "Это поле должно содержать как минимум одну специальную символ",
  password_length: "Это поле должно содержать не менее 8 символов",
  password_length_max: "Это поле должно содержать не более 64 символов",
  password_match: "Пароли не совпадают",
} satisfies ValidationKeys;

export default Validation_RU;
