/**
 * @author lxxjn0
 */

import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function MemberLogin() {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>로그인</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {},
  buttonText: {},
});
