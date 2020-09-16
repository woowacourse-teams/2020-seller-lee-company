import { atom } from "recoil";
import { Group } from "../types/types";

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

export const groupListState = atom({
  key: "groupListExistState",
  default: <Group[]>[
    { id: 1, name: "우아한 테크코스" },
    { id: 2, name: "한성대학교" },
    { id: 3, name: "셀러리 컴퍼니" },
  ],
});
