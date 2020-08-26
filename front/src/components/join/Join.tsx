import React from "react";
import { StyleSheet, View } from "react-native";
import JoinPasswordForm from "./JoinPasswordForm";
import JoinNicknameForm from "./JoinNicknameForm";
import JoinCheckPasswordForm from "./JoinCheckPasswordForm";

export default function Join() {
  return (
    <View style={styles.container}>
      <View style={styles.joinFormContainer}>
        <View style={styles.joinTextFormContainer}>
          <JoinNicknameForm />
        </View>
        <View style={styles.joinTextFormContainer}>
          <JoinPasswordForm />
        </View>
        <View style={styles.joinTextFormContainer}>
          <JoinCheckPasswordForm />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  joinFormContainer: {
    justifyContent: "center",
  },
  joinTextFormContainer: {
    justifyContent: "center",
    marginVertical: 5,
  },
});
