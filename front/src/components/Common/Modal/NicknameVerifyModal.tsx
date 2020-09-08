import React from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import { ModalVisibleProps } from "../../../types/types";

//안씀
export default function NicknameVerifyModal({
  toggleModal,
  modalVisible,
}: ModalVisibleProps) {
  return (
    <Modal
      animationType={"fade"}
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => toggleModal()}
    >
      <View style={styles.container}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}> 중복된 닉네임입니다. </Text>
          <View style={styles.emptyContainer}>
            <TouchableHighlight
              style={styles.button}
              onPress={() => toggleModal()}
            >
              <Text style={styles.buttonText}>나가기</Text>
            </TouchableHighlight>
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
  emptyContainer: {
    flexDirection: "row",
  },
  button: {
    backgroundColor: "#dfd3c3",
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
