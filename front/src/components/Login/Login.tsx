import React from "react";
import { StyleSheet, View } from "react-native";
import LoginNicknameForm from "./LoginNicknameForm";
import LoginPasswordForm from "./LoginPasswordForm";

export default function Login() {
  return (
    <View style={styles.container}>
      <View style={styles.LoginFormContainer}>
        <View style={styles.LoginTextFormContainer}>
          <LoginNicknameForm />
        </View>
        <View style={styles.LoginTextFormContainer}>
          <LoginPasswordForm />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  LoginFormContainer: {
    justifyContent: "center",
  },
  LoginTextFormContainer: {
    justifyContent: "center",
    marginVertical: 5,
  },
});
