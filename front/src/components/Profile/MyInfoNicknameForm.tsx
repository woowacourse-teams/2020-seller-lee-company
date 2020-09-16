import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import theme from "../../colors";
import { Feather } from "@expo/vector-icons";
import {
  myInfoNicknameDuplicatedState,
  myInfoNicknameState,
  myInfoSubmitState,
  myInfoInitialState,
} from "../../states/myInfoState";
import ValidateIcon from "../auth/ValidateIcon";
import ValidateMessage from "../auth/ValidateMessage";
import { nicknameFormColor } from "../../nicknameFormColor";
import { useRecoilState, useRecoilValue } from "recoil/dist";
import { memberNicknameState } from "../../states/memberState";

export default function MyInfoNicknameForm() {
  const isMyInfoInitial = useRecoilValue(myInfoInitialState);
  const nicknameDuplicatedState = useRecoilValue(myInfoNicknameDuplicatedState);
  const memberNickname = useRecoilValue(memberNicknameState);
  const [focusTextInputState, setFocusTextInputState] = useState(false);
  const [myInfoNickname, setMyInfoNickname] = useRecoilState(
    myInfoNicknameState,
  );
  const [myInfoSubmit, setMyInfoSubmit] = useRecoilState(myInfoSubmitState);

  useEffect(() => {
    setMyInfoNickname(memberNickname);
  }, [memberNickname]);

  const dynamicStyles = StyleSheet.create({
    NicknameFormContainer: {
      flexDirection: "row",
      paddingVertical: 10,
      borderWidth: 2,
      borderRadius: 100,
      borderColor: nicknameFormColor(
        myInfoNickname,
        myInfoSubmit,
        nicknameDuplicatedState,
        focusTextInputState,
      ),
    },
    title: {
      marginLeft: 15,
      marginVertical: 5,
      color: nicknameFormColor(
        myInfoNickname,
        myInfoSubmit,
        nicknameDuplicatedState,
        focusTextInputState,
      ),
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
            color={nicknameFormColor(
              myInfoNickname,
              myInfoSubmit,
              nicknameDuplicatedState,
              focusTextInputState,
            )}
            style={styles.lockIcon}
          />
        </View>
        <TextInput
          onFocus={() => setFocusTextInputState(true)}
          onBlur={() => setFocusTextInputState(false)}
          value={myInfoNickname}
          onChangeText={(text) => {
            setMyInfoSubmit(false);
            setMyInfoNickname(text);
          }}
          style={styles.passwordForm}
          placeholder={"변경할 닉네임을 입력해주세요."}
        />
        {!isMyInfoInitial && (
          <ValidateIcon
            nickname={myInfoNickname}
            submitState={myInfoSubmit}
            duplicatedState={nicknameDuplicatedState}
          />
        )}
      </View>
      {!isMyInfoInitial && (
        <ValidateMessage
          nickname={myInfoNickname}
          submitState={myInfoSubmit}
          duplicatedState={nicknameDuplicatedState}
        />
      )}
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
  lockIcon: {
    marginLeft: 10,
  },
  passwordForm: {
    flex: 1,
    fontSize: 16,
    marginHorizontal: 15,
  },
  validateIcon: {
    marginRight: 10,
  },
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
