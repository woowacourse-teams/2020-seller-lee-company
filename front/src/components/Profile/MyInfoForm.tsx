import React from "react";
import {
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import MyInfoNicknameForm from "./MyInfoNicknameForm";
import theme from "../../colors";

export default function MyInfoForm() {
  return (
    <TouchableWithoutFeedback accessible={false} onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.itemContainer}>
          <MyInfoNicknameForm />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemContainer: {
    marginVertical: 10,
  },
  item: {
    aspectRatio: 6,
  },
  text: {
    fontSize: 14,
    marginBottom: 10,
  },
  input: {
    fontSize: 18,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: theme.border,
  },
});
