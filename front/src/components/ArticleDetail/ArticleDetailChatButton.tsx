import React from "react";
import { StyleSheet, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

// import { ChatRoomNavigationProp } from "../../types/types";
import theme from "../../colors";

export default function ArticleDetailChatButton() {
  // const navigation = useNavigation<ChatRoomNavigationProp>();

  return (
    <TouchableOpacity
      activeOpacity={0.4}
      style={styles.addButton}
      onPress={() => {
        // navigation.navigate("ChatRoom");
      }}
    >
      <Text style={styles.text}>채팅하기</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  addButton: {
    backgroundColor: theme.primary,
    paddingVertical: 15,
    paddingHorizontal: 25,
    marginRight: 5,
    borderRadius: 10,
  },
  text: {
    fontSize: 15,
    color: theme.tertiary,
  },
});
