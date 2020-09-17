import React from "react";
import { WebView } from "react-native-webview";
import { StyleSheet, View } from "react-native";
import { KAKAO_LOGIN_API_URI, organizationAPI } from "../../api/api";
import { DeviceStorage } from "../../auth/DeviceStorage";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParam } from "../../types/types";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  memberNicknameState,
  memberProfileState,
} from "../../states/memberState";
import { organizationListState } from "../../states/organizationState";

interface KakakoLoginWebViewProp {
  toggleModal: Function;
}

interface response {
  nickname: string;
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
  const [organizationList, setOrganizationList] = useRecoilState(
    organizationListState,
  );
  const setProfile = useSetRecoilState(memberProfileState);

  const INJECTED_JAVASCRIPT = ` (function() {
      document.getElementsByTagName('pre')[0].style.display="none";
      window.ReactNativeWebView.postMessage(document.getElementsByTagName('pre')[0].innerHTML);
      })();
      true;`;

  const navigateByOrganizationList = async () => {
    try {
      const { data, status } = await organizationAPI.showAll();

      if (status === 200 && data.length !== 0) {
        setOrganizationList(data);
        return navigation.navigate("HomeStack");
      }
      return navigation.navigate("OrganizationHomeScreen");
    } catch (error) {
      console.warn("KakaoLoginWebView: organizationAPI showAll error");
      console.warn(error);
    }
  };

  const loginAccess = async (data: string) => {
    const { nickname, accessToken }: response = JSON.parse(data);
    setMemberNicknameState(nickname);
    setProfile({ avatar: "", nickname, score: 0 });

    if (accessToken) {
      toggleModal();
      await DeviceStorage.storeToken(accessToken);

      if (nickname === null) {
        navigation.navigate("JoinScreen");
        return;
      }
      await navigateByOrganizationList();
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
