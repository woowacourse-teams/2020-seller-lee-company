import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useRecoilState } from "recoil/dist";
import { memberInfoNicknameState } from "../../states/memberState";
import NicknameVerifyModal from "../Common/Modal/NicknameVerifyModal";
import { memberAPI } from "../../api/api";

export default function MyInfoForm() {
  const NICKNAME = "닉네임";

  const [modalVisible, setModalVisible] = useState(false);
  const [nickname, setNickname] = useRecoilState(memberInfoNicknameState);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const verifyNickname = async () => {
    const { data } = await memberAPI.findNickname({ nickname });
    setModalVisible(data);
  };

  return (
    <View style={styles.container}>
      <NicknameVerifyModal
        toggleModal={toggleModal}
        modalVisible={modalVisible}
      />
      <View style={styles.item}>
        <Text style={styles.text}>{NICKNAME}</Text>
        <TextInput
          style={styles.input}
          placeholder={NICKNAME}
          value={nickname}
          onChangeText={setNickname}
          textContentType={"username"}
        />
        <View style={styles.addWrapperMargin}>
          <View style={styles.addWrapper}>
            <TouchableOpacity
              activeOpacity={0.4}
              style={styles.addButton}
              onPress={verifyNickname}
            >
              <Text style={styles.buttonText}>중복 확인</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderTopWidth: 1,
    borderColor: "#ddd",
  },
  item: {
    flexDirection: "row",
  },
  text: {
    flex: 1,
    fontSize: 18,
    padding: 20,
  },
  input: {
    flex: 3,
    fontSize: 18,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  addWrapperMargin: {
    flex: 1,
    flexDirection: "row",
    margin: 10,
  },
  addWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "25%",
    borderRadius: 10,
    borderColor: "gray",
    borderWidth: 0.5,
  },
  buttonText: {
    fontWeight: "200",
    color: "gray",
  },
  addButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
