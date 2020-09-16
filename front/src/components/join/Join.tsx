import React from "react";
import { StyleSheet, View } from "react-native";
import JoinNicknameForm from "./JoinNicknameForm";

export default function Join() {
  return (
    <View style={styles.container}>
      <View style={styles.joinFormContainer}>
        <View style={styles.joinTextFormContainer}>
          <JoinNicknameForm />
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
