import React from "react";
import {
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
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
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.contentContainer}>
          <Text style={styles.title}>닉네임으로 로그인</Text>
          <TouchableWithoutFeedback
            accessible={false}
            onPress={Keyboard.dismiss}
          >
            <View style={styles.LoginFormContainer}>
              <View style={styles.LoginTextFormContainer}>
                <LoginNicknameForm />
              </View>
              <View style={styles.LoginTextFormContainer}>
                <LoginPasswordForm />
              </View>
            </View>
          </TouchableWithoutFeedback>
          <View style={styles.LoginSubmitContainer}>
            <LoginSubmit resetLoginForm={resetMemberLoginValue} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
  },
  scrollView: {
    flex: 1,
    paddingTop: 40,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    paddingBottom: 40,
  },
  title: {
    marginVertical: 30,
    fontSize: 20,
    fontWeight: "bold",
  },
  LoginFormContainer: {
    justifyContent: "center",
    marginVertical: 30,
  },
  LoginTextFormContainer: {
    justifyContent: "center",
    marginVertical: 5,
  },
  LoginSubmitContainer: {
    justifyContent: "center",
    marginVertical: 5,
  },
});
