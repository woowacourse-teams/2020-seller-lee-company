import React, { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { useSetRecoilState } from "recoil/dist";
import { joinNicknameState } from "../../states/joinState";
import theme from "../../colors";

export default function JoinNicknameForm() {
  const [focusTextInputState, setFocusTextInputState] = useState(false);
  const setNicknameState = useSetRecoilState(joinNicknameState);

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
          onChangeText={setNicknameState}
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
  nicknameForm: {
    flex: 1,
    fontSize: 16,
    marginHorizontal: 5,
  },
});
