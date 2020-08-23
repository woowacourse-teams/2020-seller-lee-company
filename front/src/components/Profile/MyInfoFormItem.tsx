import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

interface MyInfoFormItemProp {
  title: string;
  isPassword?: boolean;
}

export default function MyInfoFormItem({
  title,
  isPassword,
}: MyInfoFormItemProp) {
  const [value, setValue] = useState("");

  return (
    <View style={styles.item}>
      <Text style={styles.text}>{title}</Text>
      {isPassword ? (
        <TextInput
          style={styles.input}
          placeholder={title}
          value={value}
          onChangeText={setValue}
          textContentType={"password"}
          secureTextEntry={true}
        />
      ) : (
        <TextInput
          style={styles.input}
          placeholder={title}
          value={value}
          onChangeText={setValue}
          textContentType={"nickname"}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
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
