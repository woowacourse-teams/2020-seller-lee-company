import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import theme from "../../colors";
import { useSetRecoilState } from "recoil/dist";
import { loginPasswordState } from "../../states/loginState";

export default function LoginPasswordForm() {
  const [focusTextInputState, setFocusTextInputState] = useState(false);
  const [secureText, setSecureText] = useState(true);
  const setPasswordState = useSetRecoilState(loginPasswordState);

  const dynamicStyles = StyleSheet.create({
    passwordFormContainer: {
      flexDirection: "row",
      paddingVertical: 10,
      borderWidth: 2,
      borderRadius: 100,
      borderColor: focusTextInputState ? theme.secondary : "lightgrey",
    },
    title: {
      marginLeft: 15,
      marginVertical: 5,
      color: focusTextInputState ? theme.secondary : "lightgrey",
      fontSize: 14,
      fontWeight: "bold",
    },
  });

  return (
    <View style={styles.container}>
      <Text style={dynamicStyles.title}>비밀번호</Text>
      <View style={dynamicStyles.passwordFormContainer}>
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons
            name="lock-outline"
            size={20}
            color={focusTextInputState ? theme.secondary : "lightgrey"}
            style={styles.lockIcon}
          />
        </View>
        <TextInput
          onFocus={() => setFocusTextInputState(true)}
          onBlur={() => setFocusTextInputState(false)}
          onChangeText={setPasswordState}
          style={styles.passwordForm}
          placeholder={"Password"}
          secureTextEntry={secureText}
        />
        <View style={styles.iconContainer}>
          <Feather
            name={secureText ? "eye-off" : "eye"}
            size={20}
            color={secureText ? "lightgrey" : theme.secondary}
            style={styles.eyeIcon}
            onPress={() => setSecureText(!secureText)}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
  },
  iconContainer: {
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  lockIcon: {
    marginLeft: 10,
  },
  passwordForm: {
    flex: 1,
    fontSize: 16,
    marginHorizontal: 5,
  },
  eyeIcon: {
    justifyContent: "center",
    marginRight: 10,
  },
});
