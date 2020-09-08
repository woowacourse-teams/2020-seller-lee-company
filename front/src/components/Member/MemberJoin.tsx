/**
 * @author lxxjn0
 */

import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function MemberJoin() {
  return (
    <TouchableOpacity style={styles.container}>
      <Text style={styles.buttonText}>회원가입</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 14,
    color: "grey",
  },
});
