import React, { useState } from "react";
import { Feather } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";
import theme from "../../colors";
import { StackNavigationProp } from "@react-navigation/stack";
import {
  HomeStackParam,
  PostingStackParam,
  RootStackParam,
} from "../../types/types";

type ArticleFormOptionsModalNavigationProp = CompositeNavigationProp<
  StackNavigationProp<PostingStackParam, "ArticleFormScreen">,
  CompositeNavigationProp<
    StackNavigationProp<HomeStackParam, "ArticleFormScreen">,
    StackNavigationProp<RootStackParam, "HomeStack">
  >
>;

export default function ArticleFormOptionsModal() {
  const navigation = useNavigation<ArticleFormOptionsModalNavigationProp>();

  const [modalVisible, setModalVisible] = useState(false);

  const onPress = () => {
    navigation.navigate("ArticleFormScreen");
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.writeButtonContainer}
        onPress={() => {
          setModalVisible(true);
        }}
      >
        <Feather name="edit" size={24} color={"grey"} />
      </TouchableOpacity>
      <Modal
        style={styles.contentView}
        backdropOpacity={0.4}
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(false)}
      >
        <TouchableOpacity style={styles.content} onPress={onPress}>
          <View style={styles.optionContainer}>
            <Text style={styles.title}>게시글 작성 </Text>
            <Feather name="edit-3" size={20} color={theme.secondary} />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  writeButtonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  contentView: {
    justifyContent: "flex-end",
    margin: 0,
  },
  content: {
    aspectRatio: 4.5,
    backgroundColor: "white",
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
  optionContainer: {
    flex: 1,
    // backgroundColor: "yellow",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: theme.primary,
  },
});
