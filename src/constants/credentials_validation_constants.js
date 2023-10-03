//validate method inputs
export const EMAIL_INPUT = "email";
export const PASSWORD_INPUT = "password";
export const CONFIRM_PASSWORD_INPUT = "confirm_password";
export const VALIDATE_EVERYTHING_INPUT = "validate";

//regexes
///email related regexes
export const EAMAIL_VALIDATION_REGEX =
  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
export const EMAIL_ALLOWED_CHARACTERS_REGEX =
  /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const EMAIL_AT_SYMBOL_REGEX = /@/;
export const EMAIL_DOT_REGEX = /\./;
export const EMAIL_DOMAIN_NAME_REGEX = /\w{2,3}$/;
///password related regexes
export const PASSWORD_VALIDATION_REGEX =
  /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/;
export const PASSWORD_LOWER_CASE_REGEX = /(?=.*[a-z])/;
export const PASSWORD_UPPER_CASE_REGEX = /(?=.*[A-Z])/;
export const PASSWORD_DIGIT_REGEX = /(?=.*[0-9])/;
export const PASSWORD_SPECIAL_CHARACTER_REGEX = /(?=.*[^A-Za-z0-9])/;
export const PASSWORD_LENGTH_REGEX = /(?=.{8,})/;

//validation error messages
export const VALIDATION_ERROR = "validation failed!";
///password related validation error messages
export const PASSWORD_DOES_NOT_MATCH = "password does not match!";
export const PASSWORD_MUST_CONTAIN_LOWER =
  "password must contain at least one lowercase letter.";
export const PASSWORD_MUST_CONTAIN_UPPER =
  "password must contain at least one uppercase letter.";
export const PASSWORD_MUST_CONTAIN_DIGTI =
  "password must contain at least one digit.";
export const PASSWORD_MUST_CONTAIN_SPECIAL =
  "password must contain at least one specail character.";
export const PASSWORD_LEAST_LENGTH =
  "password must be at least 8 characters long.";
export const PASSWORD_GENERAL_INVALID_MESSAGE = "invalid password!";
///email related validation error messages
export const EMAIL_ALLOWED_CHARACTERS =
  "only letters, numbers, dots, underscores & hyphens are allowed.";
export const EMAIL_MISSING_AT_SYMBOL = "email must contain '@'.";
export const EMAIL_MISSING_DOT_SYMBOL = "missing '.'!";
export const EMAIL_INVALID_DOMAIN_NAME = "invalid domain name!";
export const EMAIL_GENEARAL_INVALID_MESSAGE = "enter valid email id!";
