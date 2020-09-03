import React, { useLayoutEffect } from "react";
import {
  ImageBackground,
  Keyboard,
  Platform,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RootStackParam } from "../types/types";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Login from "../components/Login/Login";
import JoinButton from "../components/auth/JoinButton";
import LoginSubmit from "../components/Login/LoginSubmit";
// import KakaoLoginButton from "../components/auth/KakaoLoginButton";
import theme from "../colors";
import { useResetRecoilState } from "recoil/dist";
import { loginNicknameState, loginPasswordState } from "../states/loginState";
import { StackNavigationProp } from "@react-navigation/stack";

type AuthScreenNavigationProp = StackNavigationProp<
  RootStackParam,
  "AuthScreen"
>;

export default function AuthScreen() {
  const navigation = useNavigation<AuthScreenNavigationProp>();

  const resetMemberEmail = useResetRecoilState(loginNicknameState);
  const resetMemberPassword = useResetRecoilState(loginPasswordState);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const resetMemberLoginValue = () => {
    resetMemberEmail();
    resetMemberPassword();
  };

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.keyboardAwareScrollView}
        extraScrollHeight={Platform.OS === "ios" ? -160 : 0}
        enableOnAndroid={true}
        enableAutomaticScroll={true}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <TouchableWithoutFeedback accessible={false} onPress={Keyboard.dismiss}>
          <ImageBackground
            style={styles.imageBackground}
            source={require("../../assets/wave_2.jpg")}
          >
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Login</Text>
            </View>
            <View style={styles.loginFormContainer}>
              <View style={styles.loginContainer}>
                <Login />
              </View>
              <View style={styles.buttonsContainer}>
                <View style={styles.buttonContainer}>
                  <LoginSubmit resetLoginForm={resetMemberLoginValue} />
                </View>
                {/*<View style={styles.buttonContainer}>*/}
                {/*  <Text style={styles.dividerText}>OR</Text>*/}
                {/*</View>*/}
                {/*<View style={styles.buttonContainer}>*/}
                {/*  <KakaoLoginButton />*/}
                {/*</View>*/}
                <View style={styles.buttonContainer}>
                  <JoinButton />
                </View>
              </View>
            </View>
          </ImageBackground>
        </TouchableWithoutFeedback>
      </KeyboardAwareScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardAwareScrollView: {
    flexGrow: 1,
    flexShrink: 0,
  },
  imageBackground: {
    flex: 1,
  },
  titleContainer: {
    aspectRatio: 1.5,
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
  loginFormContainer: {
    flex: 1,
    backgroundColor: "white",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 30,
  },
  loginContainer: {
    marginHorizontal: 30,
    marginBottom: 40,
  },
  buttonsContainer: {
    justifyContent: "center",
    marginHorizontal: 30,
    marginVertical: 20,
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
