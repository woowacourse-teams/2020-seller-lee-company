import React from "react";
import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { useRecoilState } from "recoil/dist";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { articleModalActivationState } from "../../states/articleState";
import {
  HomeStackParam,
  PostingStackParam,
  RootStackParam,
} from "../../types/types";
import { StackNavigationProp } from "@react-navigation/stack";
import theme from "../../colors";

type ArticleFormScreenModalNavigationProp = CompositeNavigationProp<
  StackNavigationProp<PostingStackParam, "ArticleFormScreen">,
  CompositeNavigationProp<
    StackNavigationProp<HomeStackParam, "ArticleFormScreen">,
    StackNavigationProp<RootStackParam, "HomeStack">
  >
>;

interface ArticleFormScreenModalProps {
  resetCreateScreen: Function;
}

export default function ArticleFormScreenModal({
  resetCreateScreen,
}: ArticleFormScreenModalProps) {
  const navigation = useNavigation<ArticleFormScreenModalNavigationProp>();

  const [articleModalState, setArticleModalState] = useRecoilState(
    articleModalActivationState,
  );

  const onPressExit = () => {
    resetCreateScreen();
    setArticleModalState(false);
    navigation.goBack();
  };

  return (
    <Modal
      animationType={"fade"}
      transparent={true}
      visible={articleModalState}
      onRequestClose={() => setArticleModalState(false)}
    >
      <View style={styles.container}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>
            페이지를 나가면 작성 중인 내용이 삭제됩니다.{"\n"}
            페이지를 나가시겠습니까?
          </Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setArticleModalState(false)}
            >
              <Text style={styles.buttonText}>돌아가기</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={onPressExit}>
              <Text style={styles.buttonText}>나가기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
    shadowColor: "black",
    shadowOffset: {
      width: 3,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 3,
  },
  modalText: {
    marginBottom: 20,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
  },
  button: {
    backgroundColor: theme.secondary,
    borderRadius: 20,
    marginHorizontal: 5,
    padding: 10,
    elevation: 2,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    marginHorizontal: 10,
  },
});
