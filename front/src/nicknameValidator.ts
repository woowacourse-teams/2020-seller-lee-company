import { memberAPI } from "./api/api";

const VALID_PASSWORD_LOWER_BOUND = 6;
const VALID_NICKNAME_UPPER_BOUND = 8;

export const isBlank = (value: string) => {
  return value === "";
};

export const isValidNickname = (nickname: string) => {
  return nickname.length <= VALID_NICKNAME_UPPER_BOUND;
};

export const isDuplicatedNickname = async (joinNickname: string) => {
  const { data } = await memberAPI.findNickname({ nickname: joinNickname });

  return data;
};

//todo 제거
//----
export const isValidPassword = (password: string) => {
  return password.length >= VALID_PASSWORD_LOWER_BOUND;
};

export const isSamePassword = (password: string, checkPassword: string) => {
  return password === checkPassword;
};
//----
