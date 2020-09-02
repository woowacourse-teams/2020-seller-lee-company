import React from "react";
import {
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useRecoilValue } from "recoil/dist";
import { memberProfileState } from "../../states/memberState";
import MyInfoPasswordForm from "./MyInfoPasswordForm";
import MyInfoCheckPasswordForm from "./MyInfoCheckPasswordForm";
import theme from "../../colors";

export default function MyInfoForm() {
  const { nickname } = useRecoilValue(memberProfileState);

  return (
    <TouchableWithoutFeedback accessible={false} onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.itemContainer}>
          <MyInfoPasswordForm />
        </View>
        <View style={styles.itemContainer}>
          <MyInfoCheckPasswordForm />
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
