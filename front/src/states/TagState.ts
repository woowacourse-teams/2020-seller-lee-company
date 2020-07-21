/**
 * @author joseph415
 */

import { atom } from "recoil/dist";
import { Tag } from "../types/types";

export const tagIdState = atom({
  key: "tagIdState",
  default: 0,
});

export const isModalOpenState = atom({
  key: "IsModalOpenState",
  default: false,
});

export const inputState = atom({
  key: "inputState",
  default: "",
});

export const tagBoxesState = atom({
  key: "tagBoxesState",
  default: <Tag[]>[],
});
