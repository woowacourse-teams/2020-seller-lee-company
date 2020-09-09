import { isBlank, isValidNickname } from "./nicknameValidator";
import theme from "./colors";

export const nicknameFormColor = (
  nickname: string,
  SubmitState: boolean,
  DuplicateState: boolean,
  focusTextInputState: boolean,
) => {
  if ((isBlank(nickname) && SubmitState) || DuplicateState) {
    return theme.warning;
  }
  if (focusTextInputState || !isBlank(nickname)) {
    if (!isValidNickname(nickname)) {
      return theme.warning;
    } else {
      return theme.secondary;
    }
  }
  return "lightgrey";
};
