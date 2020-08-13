import { atom } from "recoil/dist";

export const memberIdState = atom({
  key: "memberIdState",
  default: 1,
});

export const memberEmailState = atom({
  key: "memberEmailState",
  default: "",
});

export const memberPasswordState = atom({
  key: "memberPasswordState",
  default: "",
});

export const memberLoginTrialState = atom({
  key: "memberLoginTrialState",
  default: false,
});

export const memberLoginVerifyState = atom({
  key: "memberLoginVerifyState",
  default: false,
});

export const enterAuthScreenState = atom({
  key: "enterAuthScreenState",
  default: false,
});
