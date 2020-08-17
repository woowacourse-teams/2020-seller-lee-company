import React from "react";
import { KeyboardAvoidingView, Platform, StyleSheet } from "react-native";
import Login from "../components/Login/Login";

export default function LoginScreen() {
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Login />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
