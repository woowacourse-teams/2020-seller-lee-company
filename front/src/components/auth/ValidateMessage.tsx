import React from "react";
import { isBlank, isValidNickname } from "../../nicknameValidator";
import { StyleSheet, Text, View } from "react-native";
import { useRecoilValue, useSetRecoilState } from "recoil/dist";
import {
  duplicateState,
  joinNicknameState,
  joinSubmitState,
  validateJoinState,
} from "../../states/joinState";
import theme from "../../colors";

export default function ValidateMessage() {
  const joinNickname = useRecoilValue(joinNicknameState);
  const isDuplicated = useRecoilValue(duplicateState);
  const joinSubmit = useRecoilValue(joinSubmitState);
  const setValidateJoinState = useSetRecoilState(validateJoinState);

  let validateMessage = null;

  if (joinSubmit) {
    if (isBlank(joinNickname)) {
      validateMessage = (
        <Text style={styles.warningMessage}>
          닉네임을 입력하지 않았습니다. 닉네임을 입력해주세요.
        </Text>
      );
    } else if (isDuplicated) {
      validateMessage = (
        <Text style={styles.warningMessage}>중복된 닉네임 입니다.</Text>
      );
    }
  } else {
    if (!isBlank(joinNickname) && !isValidNickname(joinNickname)) {
      setValidateJoinState(false);
      validateMessage = (
        <Text style={styles.warningMessage}>
          닉네임을 8글자 이내로 입력해주세요.
        </Text>
      );
    } else {
      setValidateJoinState(true);
    }
  }

  if (
    !isBlank(joinNickname) &&
    isValidNickname(joinNickname) &&
    !isDuplicated
  ) {
    setValidateJoinState(true);
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
});
