import React from "react";
import { StyleSheet, View } from "react-native";
import LoginNicknameForm from "./LoginNicknameForm";

export default function Login() {
  return (
    <View style={styles.container}>
      <View style={styles.LoginFormContainer}>
        <View style={styles.LoginTextFormContainer}>
          <LoginNicknameForm />
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
    backgroundColor: "red",
    justifyContent: "center",
  },
  LoginTextFormContainer: {
    justifyContent: "center",
    marginVertical: 5,
  },
});
