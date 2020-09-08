import React, { useLayoutEffect } from "react";
import {
  ImageBackground,
  Keyboard,
  Platform,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RootStackParam } from "../types/types";
import { HeaderBackButton, StackNavigationProp } from "@react-navigation/stack";
import { Feather } from "@expo/vector-icons";
import Join from "../components/join/Join";
import { useResetRecoilState } from "recoil/dist";
import {
  joinAvatarState,
  joinCheckPasswordState,
  joinNicknameState,
  joinPasswordState,
  joinSubmitState,
} from "../states/joinState";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import JoinSubmit from "../components/join/JoinSubmit";

type JoinScreenNavigationProp = StackNavigationProp<
  RootStackParam,
  "JoinScreen"
>;

export default function JoinScreen() {
  const navigation = useNavigation<JoinScreenNavigationProp>();

  const resetJoinNickname = useResetRecoilState(joinNicknameState);
  const resetJoinPassword = useResetRecoilState(joinPasswordState);
  const resetJoinCheckPassword = useResetRecoilState(joinCheckPasswordState);
  const resetJoinAvatar = useResetRecoilState(joinAvatarState);
  const resetJoinSubmit = useResetRecoilState(joinSubmitState);

  const resetJoinValue = () => {
    resetJoinNickname();
    resetJoinPassword();
    resetJoinCheckPassword();
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
            <Feather name="chevron-left" size={24} color="white" />
          )}
        />
      ),
      headerLeftContainerStyle: {
        alignItems: "center",
        justifyContents: "center",
        aspectRatio: 1,
      },
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.keyboardAwareScrollView}
        extraScrollHeight={Platform.OS === "ios" ? -160 : 0}
        enableOnAndroid={true}
        enableAutomaticScroll={true}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <TouchableWithoutFeedback accessible={false} onPress={Keyboard.dismiss}>
          <ImageBackground
            style={styles.imageBackground}
            source={require("../../assets/wave_3.jpeg")}
            resizeMode={"cover"}
          >
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Sign Up</Text>
            </View>
            <View style={styles.joinFormContainer}>
              <View style={styles.joinContainer}>
                <Join />
              </View>
              <View style={styles.joinSubmitContainer}>
                <JoinSubmit resetJoinForm={resetJoinValue} />
              </View>
            </View>
          </ImageBackground>
        </TouchableWithoutFeedback>
      </KeyboardAwareScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardAwareScrollView: {
    flexGrow: 1,
    flexShrink: 0,
  },
  imageBackground: {
    flex: 1,
  },
  titleContainer: {
    aspectRatio: 1.5,
    justifyContent: "center",
    marginHorizontal: 30,
    paddingLeft: 15,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "white",
  },
  joinFormContainer: {
    flex: 1,
    backgroundColor: "white",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 30,
  },
  joinContainer: {
    marginHorizontal: 30,
    marginBottom: 40,
  },
  joinSubmitContainer: {
    justifyContent: "center",
    marginHorizontal: 30,
    marginVertical: 20,
  },
});
