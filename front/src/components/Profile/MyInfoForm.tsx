import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { useRecoilState, useRecoilValue } from "recoil/dist";
import {
  memberInfoConfirmState,
  memberInfoPasswordState,
  memberProfileState,
} from "../../states/memberState";

export default function MyInfoForm() {
  const NICKNAME = "닉네임";
  const PASSWORD = "비밀번호";
  const CONFIRM_PASSWORD = "확인";

  const { nickname } = useRecoilValue(memberProfileState);
  const [password, setPassword] = useRecoilState(memberInfoPasswordState);
  const [confirm, setConfirm] = useRecoilState(memberInfoConfirmState);

  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <Text style={styles.text}>{NICKNAME}</Text>
        <Text style={styles.input}>{nickname}</Text>
      </View>
      <View style={styles.item}>
        <Text style={styles.text}>{PASSWORD}</Text>
        <TextInput
          style={styles.input}
          placeholder={PASSWORD}
          value={password}
          onChangeText={setPassword}
          textContentType={"password"}
          secureTextEntry={true}
        />
      </View>
      <View style={styles.item}>
        <Text style={styles.text}>{CONFIRM_PASSWORD}</Text>
        <TextInput
          style={styles.input}
          placeholder={CONFIRM_PASSWORD}
          value={confirm}
          onChangeText={setConfirm}
          textContentType={"password"}
          secureTextEntry={true}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderTopWidth: 1,
    borderColor: "#ddd",
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
