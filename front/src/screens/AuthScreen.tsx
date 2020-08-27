import React, { useLayoutEffect } from "react";
import {
  ImageBackground,
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AuthScreenNavigationProp } from "../types/types";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import KakaoLoginButton from "../components/auth/KakaoLoginButton";
import LoginVerifyModal from "../components/Common/Modal/LoginVerifyModal";
import theme from "../colors";
import { useResetRecoilState } from "recoil/dist";
import { loginNicknameState, loginPasswordState } from "../states/loginState";

export default function AuthScreen() {
  const navigation = useNavigation<AuthScreenNavigationProp>();

  const resetMemberNickname = useResetRecoilState(loginNicknameState);
  const resetMemberPassword = useResetRecoilState(loginPasswordState);

  const resetMemberLoginValue = () => {
    resetMemberNickname();
    resetMemberPassword();
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  });

  return (
    <ImageBackground
      style={styles.container}
      source={require("../../assets/wave_2.jpg")}
    >
      <TouchableWithoutFeedback accessible={false} onPress={Keyboard.dismiss}>
        <View style={styles.contentContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Login</Text>
          </View>
          <View style={styles.keyboardAwareScrollViewContainer}>
            <KeyboardAwareScrollView
              contentContainerStyle={styles.keyboardAwareScrollView}
              enableOnAndroid={true}
              enableAutomaticScroll={true}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
            >
              <View style={styles.buttonsContainer}>
                <View style={styles.buttonContainer}>
                  <LoginVerifyModal
                    resetMemberLoginValue={resetMemberLoginValue}
                  />
                  <KakaoLoginButton />
                </View>
              </View>
            </KeyboardAwareScrollView>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
  },
  titleContainer: {
    flex: 3,
    justifyContent: "center",
    marginHorizontal: 30,
    paddingLeft: 15,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
  },
  keyboardAwareScrollViewContainer: {
    flex: 8,
    backgroundColor: "white",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 30,
  },
  keyboardAwareScrollView: {
    flexGrow: 1,
    flexShrink: 0,
    justifyContent: "space-between",
  },
  loginContainer: {
    marginHorizontal: 30,
  },
  buttonsContainer: {
    justifyContent: "center",
    marginHorizontal: 30,
    marginTop: 20,
    marginBottom: 40,
  },
  buttonContainer: {
    marginVertical: 10,
  },
  divider: {
    aspectRatio: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  dividerText: {
    fontSize: 16,
    textAlign: "center",
    color: theme.tertiary,
  },
  joinButtonContainer: {
    marginHorizontal: 30,
    marginBottom: 40,
  },
});
