import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import KakaoLoginWebViewModal from "../Common/Modal/KakaoLoginWebViewModal";
import LoginIndicator from "./LoginIndicator";
import { DeviceStorage } from "../../auth/DeviceStorage";
import { useSetRecoilState } from "recoil/dist";
import { loadingState } from "../../states/loadingState";
import { profileAPI } from "../../api/api";
import { memberNicknameState } from "../../states/memberState";
import { useNavigation } from "@react-navigation/native";

export default function KakaoLoginButton() {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const setIsLoading = useSetRecoilState(loadingState);
  const setMemberNickname = useSetRecoilState(memberNicknameState);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const kakaoLogin = async () => {
    setIsLoading(true);
    const token = await DeviceStorage.getToken();

    if (token) {
      try {
        const { data } = await profileAPI.get();
        setMemberNickname(data.nickname);
        navigation.navigate("BottomTabNavigation");
      } catch (error) {
        console.log(error.response.data.message);
        toggleModal();
      }
    } else {
      toggleModal();
    }
    setIsLoading(false);
  };

  return (
    <View style={styles.container}>
      <LoginIndicator />
      <KakaoLoginWebViewModal
        toggleModal={toggleModal}
        modalVisible={modalVisible}
      />
      <TouchableOpacity style={styles.emptyContainer} onPress={kakaoLogin}>
        <View style={styles.imageContainer}>
          <Image
            source={require("../../../assets/KakaoTalk_logo.png")}
            style={styles.image}
            resizeMode={"contain"}
          />
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>카카오톡으로 시작하기</Text>
        </View>
        <View style={styles.imageContainer} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyContainer: {
    backgroundColor: "#f4de12",
    aspectRatio: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 100,
  },
  image: {
    height: "100%",
    width: "100%",
  },
  imageContainer: {
    aspectRatio: 1,
    padding: 15,
  },
  titleContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  titleText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
