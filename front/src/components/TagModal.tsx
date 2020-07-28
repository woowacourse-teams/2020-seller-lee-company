/**
 * @author joseph415
 */

import {
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import React from "react";
import { useRecoilState } from "recoil/dist";
import { isModalOpenState } from "../states/TagState";

export default function TagModal() {
  const [isModalOpen, setIsModalOpen] = useRecoilState(isModalOpenState);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isModalOpen}
      onRequestClose={() => setIsModalOpen(false)}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>최대 3개의 태그만 가능합니다.</Text>

          <TouchableHighlight
            style={styles.closeButton}
            onPress={() => setIsModalOpen(false)}
          >
            <Text style={styles.textStyle}>닫기</Text>
          </TouchableHighlight>
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
