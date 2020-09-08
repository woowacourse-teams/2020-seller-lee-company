const VALID_NICKNAME_UPPER_BOUND = 8;
const VALID_PASSWORD_LOWER_BOUND = 6;

export const isBlank = (value: string) => {
  return value === "";
};

export const isValidNickname = (nickname: string) => {
  return nickname.length <= VALID_NICKNAME_UPPER_BOUND;
};

export const isValidPassword = (password: string) => {
  return password.length >= VALID_PASSWORD_LOWER_BOUND;
};

export const isSamePassword = (password: string, checkPassword: string) => {
  return password === checkPassword;
};

export const verify = (
  nickname: string,
  password: string,
  checkPassword: string,
) => {
  return (
    !isBlank(nickname) &&
    !isBlank(password) &&
    isValidNickname(nickname) &&
    isValidPassword(password) &&
    isSamePassword(password, checkPassword)
  );
};
