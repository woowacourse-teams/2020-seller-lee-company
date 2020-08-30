import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { useRecoilState, useRecoilValue } from "recoil/dist";
import { joinNicknameState, joinSubmitState } from "../../states/joinState";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { isBlank, isValidNickname } from "../../nicknameValidator";
import theme from "../../colors";
import ValidateMessage from "../auth/ValidateMessage";
import ValidateIcon from "../auth/ValidateIcon";

export default function JoinNicknameForm() {
  const [focusTextInputState, setFocusTextInputState] = useState(false);
  const [joinNickname, setJoinNickname] = useRecoilState(joinNicknameState);
  const joinSubmit = useRecoilValue(joinSubmitState);

  console.log("jojojojojojo: " + joinSubmit);
  console.log("nickname: " + joinNickname);

  const changeDynamicColor = () => {
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
    passwordFormContainer: {
      flex: 1,
      flexDirection: "row",
      paddingVertical: 10,
      borderWidth: 2,
      borderRadius: 100,
      borderColor: changeDynamicColor(),
    },
    title: {
      marginLeft: 15,
      marginVertical: 5,
      color: changeDynamicColor(),
      fontSize: 14,
      fontWeight: "bold",
    },
  });

  return (
    <View style={styles.container}>
      <Text style={dynamicStyles.title}>닉네임</Text>
      <View style={dynamicStyles.passwordFormContainer}>
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons
            name="account-outline"
            size={20}
            color={changeDynamicColor()}
            style={styles.accountIcon}
          />
        </View>
        <TextInput
          onFocus={() => setFocusTextInputState(true)}
          onBlur={() => {
            setFocusTextInputState(false);
          }}
          onChangeText={setJoinNickname}
          style={styles.nicknameForm}
          placeholder={"사용할 닉네임을 입력해주세요."}
        />
        <ValidateIcon />
      </View>
      <ValidateMessage />
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
