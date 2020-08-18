import { atom } from "recoil/dist";
import { Score } from "../types/types";

export const scoresState = atom({
  key: "scoresState",
  default: <Score[]>[],
});
