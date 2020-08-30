import React, { useEffect, useState } from "react";
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
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import theme from "../../colors";

export default function MyInfoForm() {
  const NICKNAME = "닉네임";

  const [modalVisible, setModalVisible] = useState(false);
  const [nickname, setNickname] = useRecoilState(memberInfoNicknameState);
  const [validatorVisible, setValidatorVisible] = useState(false);

  const [initNickname, setInit] = useState("");

  const validateIconOnSubmit = () => {
    return (
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons
            name="check-circle-outline"
            size={20}
            color={theme.primary}
            style={styles.validateIcon}
          />
        </View>
      </View>
    );
  };

  useEffect(() => {
    setInit(nickname);
  }, []);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const verifyNickname = async () => {
    const { data } = await memberAPI.findNickname({ nickname });
    console.log("MyInfo: " + data);
    setModalVisible(data);
    setValidatorVisible(!data);
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
          onChangeText={(text) => {
            setValidatorVisible(false);
            setNickname(text);
          }}
          textContentType={"username"}
        />
        {validatorVisible && validateIconOnSubmit()}
        <View style={styles.addWrapperMargin}>
          <View style={styles.addWrapper}>
            {initNickname === nickname ? (
              <View style={styles.addButton}>
                <TouchableWithoutFeedback style={styles.addButtonInitNickname}>
                  <Text style={styles.buttonText}>중복 확인</Text>
                </TouchableWithoutFeedback>
              </View>
            ) : (
              <TouchableOpacity
                activeOpacity={0.4}
                style={styles.addButton}
                onPress={verifyNickname}
              >
                <Text style={styles.buttonText}>중복 확인</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  validateIcon: {
    marginRight: 10,
  },
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
  addButtonInitNickname: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
