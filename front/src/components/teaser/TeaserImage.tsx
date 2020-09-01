import React, { useState } from "react";
import { ImageBackground, ImageProps, StyleSheet, View } from "react-native";
import AuthButton from "../auth/AuthButton";
import SvgTeaserTitle from "../svg/SvgTeaserTitle";
import SvgWhale from "../svg/SvgWhale";
import LoginIndicator from "../Login/LoginIndicator";
import KakaoLoginWebViewModal from "../Common/Modal/KakaoLoginWebViewModal";
import LoginVerifyModal from "../Common/Modal/LoginVerifyModal";
import { useRecoilValue } from "recoil/dist";
import { memberState } from "../../states/memberState";

interface TeaserImageProps {
  sourceUrl: ImageProps;
}

export default function TeaserImage({ sourceUrl }: TeaserImageProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const state = useRecoilValue(memberState);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <View style={styles.container}>
      <LoginIndicator />
      <KakaoLoginWebViewModal
        toggleModal={toggleModal}
        modalVisible={modalVisible}
      />
      <ImageBackground source={sourceUrl} style={styles.imageBackground}>
        <View style={styles.titleContainer}>
          <View style={styles.svgContainer}>
            <View style={styles.svgWhale}>
              <SvgWhale />
            </View>
            <View style={styles.SvgTeaserTitle}>
              <SvgTeaserTitle />
            </View>
          </View>
        </View>
        <View style={styles.authButtonContainer}>
          <View style={styles.authButton}>
            {state === "JOIN" ? <LoginVerifyModal /> : <></>}
            <AuthButton toggleModal={toggleModal} />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
    height: "100%",
    width: "100%",
  },
  titleContainer: {
    flex: 4,
    marginHorizontal: 30,
    marginTop: 30,
    justifyContent: "flex-start",
  },
  svgContainer: {
    justifyContent: "flex-start",
    marginTop: 60,
  },
  svgWhale: {
    marginVertical: 10,
  },
  SvgTeaserTitle: {
    marginVertical: 10,
  },
  authButtonContainer: {
    flex: 1,
    marginBottom: 30,
    marginHorizontal: 30,
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  authButton: {
    width: "50%",
  },
  titleText: {
    fontSize: 40,
    fontWeight: "bold",
  },
});
