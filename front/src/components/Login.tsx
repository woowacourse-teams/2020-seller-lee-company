/**
 * @author lxxjn0
 */

import React from "react";
import {
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import axios from "axios";
import LoginEmailForm from "./LoginEmailForm";
import LoginPasswordForm from "./LoginPasswordForm";
import LoginSubmit from "./LoginSubmit";
import { useRecoilValue } from "recoil/dist";
import { memberEmailState, memberPasswordState } from "../states/loginState";

export default function Login() {
  const BASE_URL = "http://localhost:8080";

  const memberEmail = useRecoilValue(memberEmailState);
  const memberPassword = useRecoilValue(memberPasswordState);

  const login = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/login`, {
        email: memberEmail,
        password: memberPassword,
      });

      if (response.status === 200 && response.statusText === "OK") {
        console.log("로그인 성공");
      }
    } catch (error) {
      console.log("로그인 실패");
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>로그인</Text>
        <TouchableWithoutFeedback accessible={false} onPress={Keyboard.dismiss}>
          <View style={styles.LoginFormContainer}>
            <View style={styles.LoginIdFormContainer}>
              <LoginEmailForm />
            </View>
            <View style={styles.LoginPasswordFormContainer}>
              <LoginPasswordForm />
            </View>
          </View>
        </TouchableWithoutFeedback>
        <View style={styles.LoginSubmitContainer}>
          <LoginSubmit login={login} />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
  },
  contentContainer: {
    flex: 1,
    paddingTop: 150,
    paddingBottom: 20,
  },
  title: {
    fontSize: 48,
    fontWeight: "bold",
  },
  LoginFormContainer: {
    justifyContent: "center",
    marginVertical: 80,
  },
  LoginIdFormContainer: {
    justifyContent: "center",
  },
  LoginPasswordFormContainer: {
    justifyContent: "center",
  },
  LoginSubmitContainer: {
    justifyContent: "center",
  },
});
