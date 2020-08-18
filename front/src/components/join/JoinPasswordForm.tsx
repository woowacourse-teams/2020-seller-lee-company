import React, { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { useSetRecoilState } from "recoil/dist";
import { joinPasswordState } from "../../states/joinState";
import theme from "../../colors";

export default function JoinPasswordForm() {
  const [focusTextInputState, setFocusTextInputState] = useState(false);
  const setPasswordState = useSetRecoilState(joinPasswordState);

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
        <TextInput
          onFocus={() => setFocusTextInputState(true)}
          onBlur={() => setFocusTextInputState(false)}
          onChangeText={setPasswordState}
          style={styles.passwordForm}
          placeholder={"비밀번호 입력"}
          secureTextEntry={true}
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
  passwordForm: {
    flex: 1,
    fontSize: 16,
    marginHorizontal: 5,
  },
});
