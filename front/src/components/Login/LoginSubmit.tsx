import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import theme from "../../colors";
import { useRecoilValue, useSetRecoilState } from "recoil/dist";
import {
  loginNicknameState,
  loginPasswordState,
  memberLoginTrialState,
  memberLoginVerifyState,
} from "../../states/loginState";
import { memberAPI } from "../../api/api";
import { DeviceStorage } from "../../auth/DeviceStorage";
import { useNavigation } from "@react-navigation/native";
import { AuthScreenNavigationProp } from "../../types/types";
import { memberNicknameState } from "../../states/memberState";

interface LoginSubmitProps {
  resetLoginForm: Function;
}

export default function LoginSubmit({ resetLoginForm }: LoginSubmitProps) {
  const navigation = useNavigation<AuthScreenNavigationProp>();

  const loginNickname = useRecoilValue(loginNicknameState);
  const loginPassword = useRecoilValue(loginPasswordState);
  const setMemberNickname = useSetRecoilState(memberNicknameState);

  const setLoginVerifyState = useSetRecoilState(memberLoginVerifyState);
  const setLoginTrialState = useSetRecoilState(memberLoginTrialState);

  const onPressSubmitButton = async () => {
    setLoginTrialState(true);
    await login();
  };

  const login = async () => {
    const request = {
      nickname: loginNickname,
      password: loginPassword,
    };

    try {
      const response = await memberAPI.login(request);

      if (response.status === 200) {
        await DeviceStorage.storeToken(response.data.accessToken);

        setLoginVerifyState(true);
        setMemberNickname(loginNickname);
        resetLoginForm();
        navigation.navigate("BottomTabNavigation");
      }
    } catch (error) {
      console.log(error);
      setLoginVerifyState(false);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.loginButton}
        onPress={onPressSubmitButton}
      >
        <Text style={styles.loginButtonText}>로그인</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    aspectRatio: 6,
  },
  loginButton: {
    flex: 1,
    backgroundColor: theme.primary,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
});
