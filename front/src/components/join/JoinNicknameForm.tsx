import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { useRecoilState, useRecoilValue } from "recoil/dist";
import {
  joinNicknameDuplicatedState,
  joinNicknameState,
  joinSubmitState,
} from "../../states/joinState";
import { Feather } from "@expo/vector-icons";
import { isBlank, isValidNickname } from "../../nicknameValidator";
import theme from "../../colors";
import ValidateMessage from "../auth/ValidateMessage";
import ValidateIcon from "../auth/ValidateIcon";

export default function JoinNicknameForm() {
  const nicknameDuplicatedState = useRecoilValue(joinNicknameDuplicatedState);
  const duplicatedState = useRecoilValue(joinNicknameDuplicatedState);

  const [focusTextInputState, setFocusTextInputState] = useState(false);
  const [joinNickname, setJoinNickname] = useRecoilState(joinNicknameState);
  const [joinSubmit, setJoinSubmit] = useRecoilState(joinSubmitState);

  const NicknameFormColor = () => {
    if ((isBlank(joinNickname) && joinSubmit) || nicknameDuplicatedState) {
      return theme.warning;
    }
    if (focusTextInputState || !isBlank(joinNickname)) {
      if (!isValidNickname(joinNickname)) {
        return theme.warning;
      } else {
        return theme.secondary;
      }
    }
    return "lightgrey";
  };

  const dynamicStyles = StyleSheet.create({
    NicknameFormContainer: {
      flexDirection: "row",
      paddingVertical: 10,
      borderWidth: 2,
      borderRadius: 100,
      borderColor: NicknameFormColor(),
    },
    title: {
      marginLeft: 15,
      marginVertical: 5,
      color: NicknameFormColor(),
      fontSize: 14,
      fontWeight: "bold",
    },
  });

  return (
    <View style={styles.container}>
      <Text style={dynamicStyles.title}>닉네임</Text>
      <View style={dynamicStyles.NicknameFormContainer}>
        <View style={styles.iconContainer}>
          <Feather
            name="user"
            size={20}
            color={NicknameFormColor()}
            style={styles.accountIcon}
          />
        </View>
        <TextInput
          onFocus={() => setFocusTextInputState(true)}
          onBlur={() => setFocusTextInputState(false)}
          onChangeText={(text) => {
            setJoinSubmit(false);
            setJoinNickname(text);
          }}
          style={styles.nicknameForm}
          placeholder={"사용할 닉네임을 입력해주세요."}
        />
        <ValidateIcon
          nickname={joinNickname}
          submitState={joinSubmit}
          duplicatedState={duplicatedState}
        />
      </View>
      <ValidateMessage
        nickname={joinNickname}
        submitState={joinSubmit}
        duplicatedState={duplicatedState}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
  },
  iconContainer: {
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  accountIcon: {
    marginLeft: 10,
  },
  nicknameForm: {
    flex: 1,
    fontSize: 16,
    marginHorizontal: 15,
  },
});
