import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

export default function MyInfoForm() {
  const EMAIL = "이메일";
  const NICKNAME = "닉네임";
  const PASSWORD = "비밀번호";
  const CONFIRM_PASSWORD = "확인";

  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <Text style={styles.text}>{EMAIL}</Text>
        <TextInput
          style={styles.input}
          placeholder={EMAIL}
          value={email}
          onChangeText={setEmail}
          textContentType={"emailAddress"}
        />
      </View>
      <View style={styles.item}>
        <Text style={styles.text}>{NICKNAME}</Text>
        <TextInput
          style={styles.input}
          placeholder={NICKNAME}
          value={nickname}
          onChangeText={setNickname}
          textContentType={"nickname"}
        />
      </View>
      <View style={styles.item}>
        <Text style={styles.text}>{PASSWORD}</Text>
        <TextInput
          style={styles.input}
          placeholder={PASSWORD}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
          textContentType={"password"}
        />
      </View>
      <View style={styles.item}>
        <Text style={styles.text}>{CONFIRM_PASSWORD}</Text>
        <TextInput
          style={styles.input}
          placeholder={CONFIRM_PASSWORD}
          value={confirm}
          onChangeText={setConfirm}
          secureTextEntry={true}
          textContentType={"password"}
        />
      </View>
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
