import React from "react";
import { Modal, StyleSheet, View } from "react-native";
import KakaoLoginWebView from "../../auth/KakaoLoginWebView";

interface kakaoWebViewModalProps {
  toggleModal: Function;
  modalVisible: boolean;
}

export default function KakaoWebViewModal({
  toggleModal,
  modalVisible,
}: kakaoWebViewModalProps) {
  return (
    <View style={styles.container}>
      <Modal
        animationType={"fade"}
        visible={modalVisible}
        transparent={true}
        onRequestClose={() => toggleModal()}
      >
        <KakaoLoginWebView toggleModal={toggleModal} />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
