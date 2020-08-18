/**
 * @author lxxjn0
 */

import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function FindPassword() {
  return (
    <View style={styles.container}>
      <Text style={styles.buttonText}>비밀번호 재설정</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 14,
    color: "grey",
  },
});
