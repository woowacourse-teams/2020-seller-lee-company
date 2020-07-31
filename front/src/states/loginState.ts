/**
 * @author lxxjn0
 */

import { atom } from "recoil/dist";

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
