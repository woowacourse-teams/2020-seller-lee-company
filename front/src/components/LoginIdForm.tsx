import React, { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import theme from "../colors";

export default function LoginIdForm() {
  const [focusTextInputState, setFocusTextInputState] = useState(false);

  const dynamicStyles = StyleSheet.create({
    idFormContainer: {
      // backgroundColor: "red",
      flexDirection: "row",
      paddingVertical: 10,
      borderBottomWidth: 2,
      borderColor: focusTextInputState ? theme.primary : "lightgrey",
    },
  });

  return (
    <View style={styles.container}>
      <View style={dynamicStyles.idFormContainer}>
        <MaterialCommunityIcons
          name="account-circle-outline"
          size={32}
          color="lightgrey"
          style={styles.accountIcon}
        />
        <TextInput
          onFocus={() => setFocusTextInputState(true)}
          onBlur={() => setFocusTextInputState(false)}
          keyboardType={"email-address"}
          style={styles.idForm}
          placeholder={"아이디 / 이메일 아이디 입력"}
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

  accountIcon: {
    marginHorizontal: 5,
    paddingVertical: 5,
  },
  idForm: {
    flex: 1,
    fontSize: 18,
    marginHorizontal: 5,
    paddingVertical: 5,
  },
});
