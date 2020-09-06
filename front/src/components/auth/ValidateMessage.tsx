import React from "react";
import { isBlank, isValidNickname } from "../../nicknameValidator";
import { StyleSheet, Text, View } from "react-native";
import theme from "../../colors";

interface ValidateMessageProps {
  nickname: string;
  submitState: boolean;
  duplicatedState: boolean;
}

export default function ValidateMessage({
  nickname,
  submitState,
  duplicatedState,
}: ValidateMessageProps) {
  let validateMessage = null;

  if (submitState) {
    if (isBlank(nickname)) {
      validateMessage = (
        <Text style={styles.warningMessage}>
          닉네임을 입력하지 않았습니다. 닉네임을 입력해주세요.
        </Text>
      );
    } else if (duplicatedState) {
      validateMessage = (
        <Text style={styles.warningMessage}>중복된 닉네임 입니다.</Text>
      );
    }
  } else {
    if (isBlank(nickname)) {
      validateMessage = <Text style={styles.emptySpace}>.</Text>;
    }
    if (!isBlank(nickname) && !isValidNickname(nickname)) {
      validateMessage = (
        <Text style={styles.warningMessage}>
          닉네임을 8글자 이내로 입력해주세요.
        </Text>
      );
    }
  }

  if (!isBlank(nickname) && isValidNickname(nickname) && !duplicatedState) {
    validateMessage = (
      <Text style={styles.validMessage}>사용 가능한 닉네임입니다.</Text>
    );
  }

  return <View>{validateMessage}</View>;
}

const styles = StyleSheet.create({
  warningMessage: {
    marginLeft: 15,
    marginVertical: 5,
    color: theme.warning,
    fontSize: 13,
    fontWeight: "bold",
  },
  validMessage: {
    marginLeft: 15,
    marginVertical: 5,
    color: theme.primary,
    fontSize: 13,
    fontWeight: "bold",
  },
  emptySpace: {
    marginLeft: 15,
    marginVertical: 5,
    fontSize: 13,
    opacity: 0,
  },
});
