import { memberAPI } from "./api/api";

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
