import React from "react";
import { StyleSheet, Text, View } from "react-native";
import LoginNicknameForm from "./LoginNicknameForm";
import LoginPasswordForm from "./LoginPasswordForm";
import LoginSubmit from "./LoginSubmit";
import { useResetRecoilState } from "recoil/dist";
import {
  loginNicknameState,
  loginPasswordState,
} from "../../states/loginState";
import LoginVerifyModal from "../Common/Modal/LoginVerifyModal";

export default function Login() {
  const resetMemberEmail = useResetRecoilState(loginNicknameState);
  const resetMemberPassword = useResetRecoilState(loginPasswordState);

  const resetMemberLoginValue = () => {
    resetMemberEmail();
    resetMemberPassword();
  };

  return (
    <View style={styles.container}>
      <LoginVerifyModal resetMemberLoginValue={resetMemberLoginValue} />
      <View style={styles.contentContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Login</Text>
        </View>
        <View style={styles.LoginFormContainer}>
          <View style={styles.LoginTextFormContainer}>
            <LoginNicknameForm />
          </View>
          <View style={styles.LoginTextFormContainer}>
            <LoginPasswordForm />
          </View>
          <View style={styles.LoginSubmitContainer}>
            <LoginSubmit resetLoginForm={resetMemberLoginValue} />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "flex-start",
  },
  titleContainer: {
    marginVertical: 80,
    marginLeft: 15,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
  },
  LoginFormContainer: {
    justifyContent: "flex-end",
    marginVertical: 40,
  },
  LoginTextFormContainer: {
    justifyContent: "center",
    marginBottom: 30,
  },
  LoginSubmitContainer: {
    justifyContent: "center",
    marginVertical: 10,
  },
});
