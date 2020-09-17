import React from "react";
import { WebView } from "react-native-webview";
import { StyleSheet, View } from "react-native";
import { KAKAO_LOGIN_API_URI } from "../../api/api";
import { DeviceStorage } from "../../auth/DeviceStorage";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParam } from "../../types/types";
import { useSetRecoilState } from "recoil";
import {
  memberAvatarState,
  memberIdState,
  memberNicknameState,
} from "../../states/memberState";

interface KakakoLoginWebViewProp {
  toggleModal: Function;
}

interface response {
  id: number;
  nickname: string;
  avatar: string;
  accessToken: string;
}

type KakaoLoginWebViewNavigationProp = StackNavigationProp<
  RootStackParam,
  "TeaserScreen"
>;

export default function KakaoLoginWebView({
  toggleModal,
}: KakakoLoginWebViewProp) {
  const navigation = useNavigation<KakaoLoginWebViewNavigationProp>();

  const setMemberNicknameState = useSetRecoilState(memberNicknameState);
  const setMemberId = useSetRecoilState(memberIdState);
  const setMemberAvatar = useSetRecoilState(memberAvatarState);

  const INJECTED_JAVASCRIPT = ` (function() {
      document.getElementsByTagName('pre')[0].style.display="none";
      window.ReactNativeWebView.postMessage(document.getElementsByTagName('pre')[0].innerHTML);
      })();
      true;`;

  const loginAccess = async (data: string) => {
    const { id, nickname, avatar, accessToken }: response = JSON.parse(data);
    setMemberId(id);
    setMemberNicknameState(nickname);
    setMemberAvatar(avatar);

    if (accessToken) {
      toggleModal();
      await DeviceStorage.storeToken(accessToken);

      if (nickname === null) {
        navigation.navigate("JoinScreen");
        return;
      }
      navigation.navigate("HomeStack");
    } else {
      console.log("not aceess token");
    }
  };

  return (
    <View style={styles.webContainer}>
      <WebView
        incognito={true}
        scalesPageToFit={true}
        javaScriptEnabled={true}
        injectedJavaScript={INJECTED_JAVASCRIPT}
        source={{
          uri: KAKAO_LOGIN_API_URI,
        }}
        onMessage={(event) => loginAccess(event.nativeEvent.data)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  webContainer: {
    flex: 1,
  },
});
