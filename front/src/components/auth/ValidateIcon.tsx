import React from "react";
import { isBlank, isValidNickname } from "../../nicknameValidator";
import { StyleSheet, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import theme from "../../colors";

interface ValidateIconProps {
  nickname: string;
  submitState: boolean;
  duplicatedState: boolean;
}

export default function ValidateIcon({
  nickname,
  submitState,
  duplicatedState,
}: ValidateIconProps) {
  let validateIcon = null;

  if (!isBlank(nickname)) {
    if (isValidNickname(nickname)) {
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

    if (submitState && duplicatedState) {
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
