import React from "react";
import { WebView } from "react-native-webview";
import { StyleSheet, View } from "react-native";
import { KAKAO_LOGIN_API_URI } from "../../api/api";
import { useSetRecoilState } from "recoil/dist";
import { DeviceStorage } from "../../auth/DeviceStorage";
import { memberLoginTrialState } from "../../states/loginState";
import { memberState } from "../../states/memberState";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParam } from "../../types/types";

interface KakakoLoginWebViewProp {
  toggleModal: Function;
}

interface response {
  accessToken: string;
  state: string;
}

type KakaoLoginWebViewNavigationProp = StackNavigationProp<
  RootStackParam,
  "TeaserScreen"
>;

export default function KakaoLoginWebView({
  toggleModal,
}: KakakoLoginWebViewProp) {
  const navigation = useNavigation<KakaoLoginWebViewNavigationProp>();

  const setLoginTrialState = useSetRecoilState(memberLoginTrialState);
  const setMemberState = useSetRecoilState(memberState);

  const INJECTED_JAVASCRIPT = ` (function() {
      document.getElementsByTagName('pre')[0].style.display="none";
      window.ReactNativeWebView.postMessage(document.getElementsByTagName('pre')[0].innerHTML);
      })();
      true;`;

  const loginAccess = async (data: string) => {
    const { accessToken, state }: response = JSON.parse(data);
    setMemberState(state);

    if (accessToken) {
      toggleModal();
      setLoginTrialState(true);
      await DeviceStorage.storeToken(accessToken);
      if (state === "NOT_JOIN") {
        navigation.navigate("JoinScreen");
      }
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
