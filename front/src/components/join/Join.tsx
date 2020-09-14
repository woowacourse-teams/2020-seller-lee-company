import React from "react";
import { StyleSheet, View } from "react-native";
import JoinNicknameForm from "./JoinNicknameForm";

export default function Join() {
  return (
    <View style={styles.container}>
      <View style={styles.joinTextFormContainer}>
        <JoinNicknameForm />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  joinTextFormContainer: {
    justifyContent: "center",
    marginVertical: 5,
  },
});
