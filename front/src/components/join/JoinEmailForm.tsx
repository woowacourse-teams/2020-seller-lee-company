import React, { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import theme from "../../colors";
import { useSetRecoilState } from "recoil/dist";
import { joinEmailState } from "../../states/joinState";

export default function JoinEmailForm() {
  const [focusTextInputState, setFocusTextInputState] = useState(false);
  const setEmailState = useSetRecoilState(joinEmailState);

  const dynamicStyles = StyleSheet.create({
    emailFormContainer: {
      flexDirection: "row",
      paddingVertical: 10,
      borderBottomWidth: 2,
      borderColor: focusTextInputState ? theme.primary : "lightgrey",
    },
  });

  return (
    <View style={styles.container}>
      <View style={dynamicStyles.emailFormContainer}>
        <TextInput
          onFocus={() => setFocusTextInputState(true)}
          onBlur={() => setFocusTextInputState(false)}
          onChangeText={setEmailState}
          keyboardType={"email-address"}
          style={styles.emailForm}
          placeholder={"아이디 / 이메일 아이디 입력"}
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
  emailForm: {
    flex: 1,
    fontSize: 16,
    marginHorizontal: 5,
  },
});
