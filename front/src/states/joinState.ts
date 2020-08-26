import { atom } from "recoil/dist";

const DEFAULT_IMAGE_URL =
  "https://seller-lee-bucket.s3.amazonaws.com/images%2F1_1597344575694.jpeg";

export const joinEmailState = atom({
  key: "joinEmailState",
  default: "",
});

export const joinNicknameState = atom({
  key: "joinNicknameState",
  default: "",
});

export const joinPasswordState = atom({
  key: "joinPasswordState",
  default: "",
});

export const joinCheckPasswordState = atom({
  key: "joinCheckPasswordState",
  default: "",
});

export const joinAvatarState = atom({
  key: "joinAvatarState",
  default: DEFAULT_IMAGE_URL,
});

export const joinSubmitState = atom({
  key: "joinSubmitState",
  default: false,
});

export const memberJoinVerifyState = atom({
  key: "memberJoinVerifyState",
  default: true,
});
