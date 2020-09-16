import { atom } from "recoil";

export const organizationEntranceCodeState = atom({
  key: "organizationEntranceCodeState",
  default: "",
});

export const organizationCreationNameState = atom({
  key: "organizationCreationNameState",
  default: "",
});

export const organizationNameExistState = atom({
  key: "organizationNameExistState",
  default: false,
});

export const organizationState = atom({
  key: "organizationState",
  default: {
    id: 0,
    name: "",
    code: "",
  },
});
