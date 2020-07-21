/**
 * @author jnsorn
 */

import React from "react";
import { Modal, View, StyleSheet, Text, Button } from "react-native";
import { useRecoilState } from "recoil/dist";
import { modalActivationState } from "../states/modalState";

interface NoticeModalProps {
  message: string;
}

export default function NoticeModal({ message }: NoticeModalProps) {
  const [modalVisible, setModalVisible] = useRecoilState(modalActivationState);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}> {message} </Text>
          <Button title={"닫기"} onPress={() => setModalVisible(false)} />
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
