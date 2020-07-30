/**
 * @author joseph415
 */

import React from "react";
import { StyleSheet, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { ArticleNavigationParamList } from "./ArticleNavigation";

type ChatButtonProp = StackNavigationProp<
  ArticleNavigationParamList,
  "ChatRoom"
>;

export default function ChatButton() {
  const navigation = useNavigation<ChatButtonProp>();

  return (
    <TouchableOpacity
      activeOpacity={0.4}
      style={styles.addButton}
      onPress={() => {
        navigation.navigate("ChatRoom");
      }}
    >
      <Text style={styles.text}>채팅하기</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  addButton: {
    backgroundColor: "#eeecda",
    paddingVertical: 15,
    paddingHorizontal: 25,
    marginRight: 5,
    borderRadius: 10,
  },
  text: {
    fontSize: 15,
    color: "#888888",
  },
});
