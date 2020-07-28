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
import LoginIdForm from "./LoginIdForm";
import LoginPasswordForm from "./LoginPasswordForm";
import LoginSubmit from "./LoginSubmit";

export default function Login() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>로그인</Text>
        <TouchableWithoutFeedback accessible={false} onPress={Keyboard.dismiss}>
          <View style={styles.LoginFormContainer}>
            <View style={styles.LoginIdFormContainer}>
              <LoginIdForm />
            </View>
            <View style={styles.LoginPasswordFormContainer}>
              <LoginPasswordForm />
            </View>
          </View>
        </TouchableWithoutFeedback>
        <View style={styles.LoginSubmitContainer}>
          <LoginSubmit />
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
