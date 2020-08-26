import React, { useLayoutEffect } from "react";
import {
  ImageBackground,
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { JoinScreenNavigationProp } from "../types/types";
import { HeaderBackButton } from "@react-navigation/stack";
import { Feather } from "@expo/vector-icons";
import Join from "../components/join/Join";
import { useResetRecoilState } from "recoil/dist";
import {
  joinAvatarState,
  joinNicknameState,
  joinPasswordState,
  joinSubmitState,
} from "../states/joinState";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import JoinSubmit from "../components/join/JoinSubmit";

export default function JoinScreen() {
  const navigation = useNavigation<JoinScreenNavigationProp>();

  const resetJoinNickname = useResetRecoilState(joinNicknameState);
  const resetJoinPassword = useResetRecoilState(joinPasswordState);
  const resetJoinAvatar = useResetRecoilState(joinAvatarState);
  const resetJoinSubmit = useResetRecoilState(joinSubmitState);

  const resetJoinValue = () => {
    resetJoinNickname();
    resetJoinPassword();
    resetJoinAvatar();
    resetJoinSubmit();
  };

  const onPressGoBack = () => {
    resetJoinValue();
    navigation.goBack();
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTransparent: true,
      headerTitle: "",
      headerLeft: () => (
        <HeaderBackButton
          labelVisible={false}
          onPress={onPressGoBack}
          backImage={() => (
            <Feather name="arrow-left" size={24} color="white" />
          )}
        />
      ),
      headerLeftContainerStyle: {
        alignItems: "center",
        justifyContents: "center",
        aspectRatio: 1,
      },
    });
  });

  return (
    <ImageBackground
      style={styles.container}
      source={require("../../assets/wave_3.jpeg")}
    >
      <TouchableWithoutFeedback accessible={false} onPress={Keyboard.dismiss}>
        <View style={styles.contentContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Sign Up</Text>
          </View>
          <View style={styles.keyboardAwareScrollViewContainer}>
            <KeyboardAwareScrollView
              contentContainerStyle={styles.keyboardAwareScrollView}
              enableOnAndroid={true}
              enableAutomaticScroll={true}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
            >
              <View style={styles.joinContainer}>
                <Join />
              </View>
              <View style={styles.joinSubmitContainer}>
                <JoinSubmit resetJoinForm={resetJoinValue} />
              </View>
            </KeyboardAwareScrollView>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
  },
  titleContainer: {
    flex: 3,
    justifyContent: "center",
    marginHorizontal: 30,
    paddingLeft: 15,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
  },
  keyboardAwareScrollViewContainer: {
    flex: 8,
    backgroundColor: "white",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 30,
  },
  keyboardAwareScrollView: {
    flexGrow: 1,
    flexShrink: 0,
    justifyContent: "space-between",
  },
  joinContainer: {
    marginHorizontal: 30,
  },
  joinSubmitContainer: {
    justifyContent: "center",
    marginHorizontal: 30,
    marginTop: 20,
    marginBottom: 40,
  },
});
