/**
 * @author jnsorn
 */

import { atom } from "recoil/dist";

export const activationState = atom({
  key: "activationState",
  default: false,
});
