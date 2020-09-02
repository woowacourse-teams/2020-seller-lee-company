import React from "react";
import { Button, Modal, StyleSheet, Text, View } from "react-native";
import { useRecoilState } from "recoil/dist";
import { articleDetailModalState } from "../../../states/modalState";
import theme from "../../../colors";
import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { HomeStackParam, RootStackParam } from "../../../types/types";
import { StackNavigationProp } from "@react-navigation/stack";

type ArticleDeleteModalNavigationProp = CompositeNavigationProp<
  StackNavigationProp<HomeStackParam, "ArticleDetailScreen">,
  StackNavigationProp<RootStackParam, "HomeStack">
>;

export default function ArticleDeleteModal() {
  const navigation = useNavigation<ArticleDeleteModalNavigationProp>();
  const [modalVisible, setModalVisible] = useRecoilState(
    articleDetailModalState,
  );

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}> 삭제되었습니다. </Text>
          <Button
            title={"목록으로 이동"}
            onPress={() => {
              setModalVisible(false);
              navigation.navigate("HomeTab");
            }}
            color={theme.primary}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 3,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
  },
  closeButton: {
    backgroundColor: "#dfd3c3",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
