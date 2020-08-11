/**
 * @author jnsorn
 */

import { atom } from "recoil/dist";

let questionAndAnswer = new Map<number, number>();

export const questionAndAnswerState = atom({
  key: "QuestionAndAnswerState",
  default: questionAndAnswer,
});
