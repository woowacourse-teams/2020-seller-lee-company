import { Button, Modal, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useRecoilState } from "recoil/dist";
import { isModalOpenState } from "../../../states/TagState";
import theme from "../../../colors";

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
          <Button
            title={"닫기"}
            color={theme.secondary}
            onPress={() => setIsModalOpen(false)}
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
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
