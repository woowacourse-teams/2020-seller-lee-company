import React from "react";
import { isBlank, isValidNickname } from "../../nicknameValidator";
import { StyleSheet, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import theme from "../../colors";
import { useRecoilValue } from "recoil/dist";
import {
  duplicateState,
  joinNicknameState,
  joinSubmitState,
} from "../../states/joinState";

export default function ValidateIcon() {
  const joinNickname = useRecoilValue(joinNicknameState);
  const duplicatedState = useRecoilValue(duplicateState);
  const joinSubmit = useRecoilValue(joinSubmitState);
  let validateIcon = null;

  if (!isBlank(joinNickname)) {
    if (isValidNickname(joinNickname)) {
      validateIcon = (
        <Feather
          name="check-circle"
          size={20}
          color={theme.primary}
          style={styles.validateIcon}
        />
      );
    } else {
      validateIcon = (
        <Feather
          name="alert-circle"
          size={20}
          color={theme.warning}
          style={styles.validateIcon}
        />
      );
    }

    if (joinSubmit && duplicatedState) {
      validateIcon = (
        <Feather
          name="alert-circle"
          size={20}
          color={theme.warning}
          style={styles.validateIcon}
        />
      );
    }
  }

  return <View style={styles.iconContainer}>{validateIcon}</View>;
}

const styles = StyleSheet.create({
  iconContainer: {
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  validateIcon: {
    marginRight: 10,
  },
});
