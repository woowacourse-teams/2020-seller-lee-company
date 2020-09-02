import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { Feather } from "@expo/vector-icons";
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
      <Text style={dynamicStyles.title}>닉네임</Text>
      <View style={dynamicStyles.nicknameFormContainer}>
        <View style={styles.iconContainer}>
          <Feather
            name="user"
            size={20}
            color={focusTextInputState ? theme.secondary : "lightgrey"}
            style={styles.accountIcon}
          />
        </View>
        <TextInput
          onFocus={() => setFocusTextInputState(true)}
          onBlur={() => setFocusTextInputState(false)}
          onChangeText={setNicknameState}
          keyboardType={"default"}
          style={styles.nicknameForm}
          placeholder={"Username"}
        />
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
  accountIcon: {
    marginLeft: 10,
  },
  nicknameForm: {
    flex: 1,
    fontSize: 16,
    marginHorizontal: 5,
  },
});
