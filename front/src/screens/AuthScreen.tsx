import React, { useLayoutEffect } from "react";
import {
  Keyboard,
  SafeAreaView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AuthScreenNavigationProp } from "../types/types";
import theme from "../colors";
import Login from "../components/Login/Login";
import JoinButton from "../components/auth/JoinButton";
import KakaoLoginButton from "../components/auth/KakaoLoginButton";

export default function AuthScreen() {
  const navigation = useNavigation<AuthScreenNavigationProp>();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  });

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback accessible={false} onPress={Keyboard.dismiss}>
        <View style={styles.contentContainer}>
          <View style={styles.loginContainer}>
            <Login />
          </View>
          <View style={styles.authButtonsContainer}>
            <View style={styles.kakaoLoginButtonContainer}>
              <KakaoLoginButton />
            </View>
            <View style={styles.joinButtonContainer}>
              <JoinButton />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    margin: 30,
  },
  loginContainer: {
    flex: 4,
  },
  titleText: {
    color: theme.primary,
    fontSize: 36,
    fontWeight: "bold",
    textAlign: "center",
  },
  authButtonsContainer: {
    flex: 1,
    justifyContent: "flex-end",
    marginVertical: 10,
  },
  kakaoLoginButtonContainer: {
    marginBottom: 5,
  },
  joinButtonContainer: {
    marginTop: 5,
  },
});
