import React from "react";
import { WebView } from "react-native-webview";
import { StyleSheet, View } from "react-native";
import { KAKAO_LOGIN_API_URI } from "../../api/api";
import { useSetRecoilState } from "recoil/dist";
import { DeviceStorage } from "../../auth/DeviceStorage";
import { memberLoginTrialState } from "../../states/loginState";
import { httpStatusState } from "../../states/memberState";
import { useNavigation } from "@react-navigation/native";
import { TeaserScreenNavigationProp } from "../../types/types";

interface KakakoLoginWebViewProp {
  toggleModal: Function;
}

interface response {
  accessToken: string;
  httpStatus: number;
}

export default function KakaoLoginWebView({
  toggleModal,
}: KakakoLoginWebViewProp) {
  const navigation = useNavigation<TeaserScreenNavigationProp>();

  const setLoginTrialState = useSetRecoilState(memberLoginTrialState);
  const setHttpStatusStates = useSetRecoilState(httpStatusState);

  const INJECTED_JAVASCRIPT = `(function() {
      window.ReactNativeWebView.postMessage(document.getElementsByTagName('pre')[0].innerHTML);
      })();
     `;
  const loginAccess = async (data: string) => {
    const { accessToken, httpStatus }: response = JSON.parse(data);
    setHttpStatusStates(httpStatus);
    console.log("httpStatus: " + httpStatus);

    if (accessToken) {
      toggleModal();
      setLoginTrialState(true);
      await DeviceStorage.storeToken(accessToken);
      if (httpStatus === 201) {
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
