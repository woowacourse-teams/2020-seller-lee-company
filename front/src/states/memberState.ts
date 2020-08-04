/**
 * @author lxxjn0
 */
import { atom } from "recoil/dist";

export const authorTheCheatState = atom({
  key: "authorTheCheatState",
  default: false,
});

export const authorIdState = atom({
  key: "authorIdState",
  default: 0,
});
