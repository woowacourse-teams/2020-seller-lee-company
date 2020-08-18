import React, { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import theme from "../../colors";
import { useSetRecoilState } from "recoil/dist";
import { loginNicknameState } from "../../states/loginState";

export default function LoginNicknameForm() {
  const [focusTextInputState, setFocusTextInputState] = useState(false);
  const setNicknameState = useSetRecoilState(loginNicknameState);

  const dynamicStyles = StyleSheet.create({
    nicknameFormContainer: {
      flexDirection: "row",
      paddingVertical: 10,
      borderBottomWidth: 2,
      borderColor: focusTextInputState ? theme.primary : "lightgrey",
    },
  });

  return (
    <View style={styles.container}>
      <View style={dynamicStyles.nicknameFormContainer}>
        <MaterialCommunityIcons
          name="account-circle-outline"
          size={28}
          color="lightgrey"
          style={styles.accountIcon}
        />
        <TextInput
          onFocus={() => setFocusTextInputState(true)}
          onBlur={() => setFocusTextInputState(false)}
          onChangeText={setNicknameState}
          keyboardType={"default"}
          style={styles.nicknameForm}
          placeholder={"닉네임 입력"}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    aspectRatio: 6,
    justifyContent: "center",
  },
  accountIcon: {
    marginHorizontal: 5,
  },
  nicknameForm: {
    flex: 1,
    fontSize: 16,
    marginHorizontal: 5,
  },
});
