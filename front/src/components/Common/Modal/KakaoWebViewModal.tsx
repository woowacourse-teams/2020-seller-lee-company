import React from "react";
import { Modal } from "react-native";
import KakaoLoginWebView from "../../auth/KakaoLoginWebView";
import { ModalVisiableProps } from "../../../types/types";

export default function KakaoWebViewModal({
  toggleModal,
  modalVisible,
}: ModalVisiableProps) {
  return (
    <Modal
      animationType={"fade"}
      visible={modalVisible}
      transparent={true}
      onRequestClose={() => toggleModal()}
      statusBarTranslucent={true}
    >
      <KakaoLoginWebView toggleModal={toggleModal} />
    </Modal>
  );
}
