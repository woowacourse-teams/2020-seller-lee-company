import { atom } from "recoil";

export const groupEntranceCodeState = atom({
  key: "groupEntranceCodeState",
  default: "",
});

export const groupCreationNameState = atom({
  key: "groupCreationNameState",
  default: "",
});

export const groupNameExistState = atom({
  key: "groupNameExistState",
  default: false,
});
