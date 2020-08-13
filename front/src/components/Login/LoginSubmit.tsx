import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import theme from "../../colors";
import { useSetRecoilState } from "recoil/dist";
import { memberLoginTrialState } from "../../states/loginState";

interface LoginSubmitProps {
  login: () => Promise<void>;
}

export default function LoginSubmit({ login }: LoginSubmitProps) {
  const setLoginTrialState = useSetRecoilState(memberLoginTrialState);

  const onPressSubmitButton = async () => {
    setLoginTrialState(true);
    await login();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.loginButton}
        onPress={onPressSubmitButton}
      >
        <Text style={styles.loginButtonText}>로그인하기</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    aspectRatio: 5,
  },
  loginButton: {
    flex: 1,
    backgroundColor: theme.primary,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  loginButtonText: {
    fontSize: 20,
    color: "white",
  },
});
