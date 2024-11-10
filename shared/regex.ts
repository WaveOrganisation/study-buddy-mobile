// Israeli phone number regex
export const phoneNumberRegex = /^(\+972|0)?(5[0-9])[ -]?\d{3}[ -]?\d{4}$/;
export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const hasLowercase = /[a-z]/;
export const hasUppercase = /[A-Z]/;
export const hasDigit = /\d/;
export const hasSpecialChar = /[@$!%*?&]/;

export const usernameRegex = /^[a-zA-Z0-9_-]{3,16}$/;
