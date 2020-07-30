import React, { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import theme from "../colors";
import { useSetRecoilState } from "recoil/dist";
import { memberPasswordState } from "../states/loginState";

export default function LoginPasswordForm() {
  const [focusTextInputState, setFocusTextInputState] = useState(false);
  const setPasswordState = useSetRecoilState(memberPasswordState);

  const dynamicStyles = StyleSheet.create({
    passwordFormContainer: {
      flexDirection: "row",
      paddingVertical: 10,
      borderBottomWidth: 2,
      borderColor: focusTextInputState ? theme.primary : "lightgrey",
    },
  });

  return (
    <View style={styles.container}>
      <View style={dynamicStyles.passwordFormContainer}>
        <MaterialCommunityIcons
          name="lock-outline"
          size={32}
          color="lightgrey"
          style={styles.lockIcon}
        />
        <TextInput
          onFocus={() => setFocusTextInputState(true)}
          onBlur={() => setFocusTextInputState(false)}
          onChangeText={setPasswordState}
          style={styles.passwordForm}
          placeholder={"비밀번호"}
          secureTextEntry={true}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    aspectRatio: 5,
    justifyContent: "center",
  },
  lockIcon: {
    marginHorizontal: 5,
    paddingVertical: 5,
  },
  passwordForm: {
    flex: 1,
    fontSize: 18,
    marginHorizontal: 5,
    paddingVertical: 5,
  },
});
