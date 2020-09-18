import { atom } from "recoil";
import { Organization } from "../types/types";

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

export const organizationExistState = atom({
  key: "organizationExistState",
  default: true,
});

export const organizationState = atom({
  key: "organizationState",
  default: <Organization>{
    id: 0,
    name: "",
    code: "",
  },
});

export const organizationListState = atom({
  key: "organizationListState",
  default: <Organization[]>[
    { id: 1, name: "우아한 테크코스", code: "123455" },
    { id: 2, name: "한성대학교", code: "908237" },
    { id: 3, name: "셀러리 컴퍼니", code: "927394" },
  ],
});

export const selectedOrganizationInFeedsState = atom({
  key: "selectedOrganizationInFeedsState",
  default: <Organization>{
    id: 0,
    name: "",
    code: "",
  },
});

export const organizationDeleteModalState = atom({
  key: "organizationDeleteModalState",
  default: false,
});

export const deleteOrganizationState = atom({
  key: "deleteOrganizationState",
  default: <Organization>{},
});

export const noOrganizationState = atom({
  key: "noOrganizationState",
  default: false,
});
