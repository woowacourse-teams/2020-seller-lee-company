import React from "react";
import { Modal, StyleSheet, View } from "react-native";
import KakaoLoginWebView from "../../Login/KakaoLoginWebView";
import { ModalVisibleProps } from "../../../types/types";

export default function KakaoLoginWebViewModal({
  toggleModal,
  modalVisible,
}: ModalVisibleProps) {
  return (
    <Modal
      animationType={"slide"}
      visible={modalVisible}
      transparent={true}
      onRequestClose={() => toggleModal()}
      statusBarTranslucent={true}
    >
      <View style={styles.emptyContainer} />
      <View style={styles.modalContainer}>
        <KakaoLoginWebView toggleModal={toggleModal} />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  emptyContainer: {
    aspectRatio: 2.19,
  },
  modalContainer: {
    width: "100%",
    flex: 1,
  },
});
