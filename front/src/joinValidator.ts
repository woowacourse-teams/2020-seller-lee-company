const VALID_PASSWORD_LOWER_BOUND = 6;

export const isBlank = (value: string) => {
  return value === "";
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
    isValidPassword(password) &&
    isSamePassword(password, checkPassword)
  );
};
