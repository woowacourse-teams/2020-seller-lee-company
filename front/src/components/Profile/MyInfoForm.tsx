import React from "react";
import { StyleSheet, View } from "react-native";
import MyInfoFormItem from "./MyInfoFormItem";

export default function MyInfoForm() {
  const NICKNAME = "닉네임";
  const PASSWORD = "비밀번호";
  const CONFIRM_PASSWORD = "확인";

  return (
    <View style={styles.container}>
      <MyInfoFormItem title={NICKNAME} />
      <MyInfoFormItem title={PASSWORD} isPassword={true} />
      <MyInfoFormItem title={CONFIRM_PASSWORD} isPassword={true} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderTopWidth: 1,
    borderColor: "#ccc",
  },
  item: {
    flexDirection: "row",
  },
  text: {
    flex: 1,
    fontSize: 18,
    padding: 20,
  },
  input: {
    flex: 3,
    fontSize: 18,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
});
