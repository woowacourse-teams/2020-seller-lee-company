import React from "react";
import { WebView } from "react-native-webview";
import { StyleSheet, View } from "react-native";
import { KAKAO_LOGIN_API_URI } from "../../api/api";
import { useSetRecoilState } from "recoil/dist";
import { DeviceStorage } from "../../auth/DeviceStorage";
import {
  memberLoginTrialState,
  memberLoginVerifyState,
} from "../../states/loginState";

interface KakakoLoginWebViewProp {
  toggleModal: Function;
}

interface response {
  accessToken: string;
}

export default function KakaoLoginWebView({
  toggleModal,
}: KakakoLoginWebViewProp) {
  const setLoginVerifyState = useSetRecoilState(memberLoginVerifyState);
  const setLoginTrialState = useSetRecoilState(memberLoginTrialState);

  const INJECTED_JAVASCRIPT = `(function() {
      window.ReactNativeWebView.postMessage(document.getElementsByTagName('pre')[0].innerHTML);
      })();
     `;
  const loginAccess = async (data: string) => {
    const { accessToken }: response = JSON.parse(data);
    console.log(accessToken);

    if (accessToken) {
      toggleModal();
      setLoginTrialState(true);
      await DeviceStorage.storeToken(accessToken);
      setLoginVerifyState(true);
    } else {
      console.log("not aceess token");
      setLoginVerifyState(false);
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
