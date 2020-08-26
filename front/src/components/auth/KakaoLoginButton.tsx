import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import KakaoWebViewModal from "../Common/Modal/KakaoWebViewModal";
import LoginIndicator from "./LoginIndicator";
import { DeviceStorage } from "../../auth/DeviceStorage";
import { useSetRecoilState } from "recoil/dist";
import { loadingState } from "../../states/loadingState";

export default function KakaoLoginButton() {
  const [modalVisible, setModalVisible] = useState(false);
  const setIsLoading = useSetRecoilState(loadingState);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  //
  // const onLogin = async () => {
  //   setIsLoading(true);
  //   const token = await AsyncStorage.getItem(TOKEN_STORAGE);
  //   if (token) {
  //     setToken(token);
  //     try {
  //       const memberResponse = await MemberApi.get(token);
  //       setMemberInfo(memberResponse);
  //       navigateWithoutHistory(navigation, "ApplicationNavigationRoot");
  //     } catch (error) {
  //       console.log(error.response.data.message);
  //       toggleModal();
  //     }
  //   } else {
  //     toggleModal();
  //   }
  //   setIsLoading(false);
  // };
  //

  const kakaoLogin = async () => {
    setIsLoading(true);
    const token = await DeviceStorage.getToken();
    console.log(token);
    if (token) {
      // try {
      //   const memberResponse = await memberAPI.get(token);
      //   setMemberInfo(memberResponse);
      //   navigateWithoutHistory(navigation, "ApplicationNavigationRoot");
      // } catch (error) {
      //   console.log(error.response.data.message);
      //   toggleModal();
      // }
    } else {
      toggleModal();
    }
    setIsLoading(false);
  };

  return (
    <View style={styles.container}>
      <LoginIndicator />
      <KakaoWebViewModal
        toggleModal={toggleModal}
        modalVisible={modalVisible}
      />
      <TouchableOpacity style={styles.buttonContainer} onPress={kakaoLogin}>
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
  buttonContainer: {
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
