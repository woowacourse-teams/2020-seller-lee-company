import React, { useEffect, useLayoutEffect } from "react";
import { StyleSheet, View } from "react-native";
import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { HeaderBackButton, StackNavigationProp } from "@react-navigation/stack";
import { Feather } from "@expo/vector-icons";
import { HomeStackParam, RootStackParam } from "../types/types";
import theme from "../colors";
import MyInfoAvatar from "../components/Profile/MyInfoAvatar";
import MyInfoForm from "../components/Profile/MyInfoForm";
import {
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
} from "recoil/dist";
import { memberInfoAvatarState } from "../states/memberState";
import { profileAPI } from "../api/api";
import {
  myInfoCheckPasswordState,
  myInfoPasswordState,
  myInfoSubmitState,
} from "../states/myInfoState";
import { isBlank, isSamePassword, isValidPassword } from "../joinValidator";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

type MyInfoScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<HomeStackParam, "MyInfoScreen">,
  StackNavigationProp<RootStackParam, "HomeStack">
>;

export default function MyInfoScreen() {
  const navigation = useNavigation<MyInfoScreenNavigationProp>();

  const [myInfoSubmit, setMyInfoSubmit] = useRecoilState(myInfoSubmitState);

  const avatar = useRecoilValue(memberInfoAvatarState);
  const myInfoPassword = useRecoilValue(myInfoPasswordState);
  const myInfoCheckPassword = useRecoilValue(myInfoCheckPasswordState);

  const resetMyInfoPassword = useResetRecoilState(myInfoPasswordState);
  const resetMyInfoCheckPassword = useResetRecoilState(
    myInfoCheckPasswordState,
  );
  const resetMyInfoSubmit = useResetRecoilState(myInfoSubmitState);

  const onPressCompleteButton = async () => {
    setMyInfoSubmit(true);
    await profileAPI.put({ password: myInfoPassword, avatar });
    resetForm();
    navigation.goBack();
  };

  const resetForm = () => {
    resetMyInfoPassword();
    resetMyInfoCheckPassword();
    resetMyInfoSubmit();
  };

  const isValidateSubmit = () => {
    return (
      !isBlank(myInfoPassword) &&
      !isBlank(myInfoCheckPassword) &&
      isValidPassword(myInfoPassword) &&
      isSamePassword(myInfoPassword, myInfoCheckPassword)
    );
  };

  const submitButtonColor = () => {
    return isValidateSubmit() ? theme.primary : "lightgrey";
  };

  const onPressBack = () => {
    resetForm();
    navigation.goBack();
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "내 정보 수정",
      headerTitleAlign: "left",
      headerLeft: () => (
        <HeaderBackButton
          labelVisible={false}
          onPress={onPressBack}
          backImage={() => (
            <Feather name="chevron-left" size={24} color="black" />
          )}
        />
      ),
      headerLeftContainerStyle: {
        alignItems: "center",
        justifyContents: "center",
        aspectRatio: 1,
      },
      headerRight: () => (
        <HeaderBackButton
          labelVisible={false}
          onPress={onPressCompleteButton}
          disabled={true}
          backImage={() => <Feather name="check" size={24} color="lightgrey" />}
        />
      ),
      headerRightContainerStyle: {
        alignItems: "center",
        justifyContents: "center",
        aspectRatio: 1,
      },
    });
  }, [navigation]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderBackButton
          labelVisible={false}
          onPress={onPressCompleteButton}
          disabled={!isValidateSubmit()}
          backImage={() => (
            <Feather name="check" size={24} color={submitButtonColor()} />
          )}
        />
      ),
    });
  }, [myInfoPassword, myInfoCheckPassword, myInfoSubmit]);

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.keyboardAwareScrollView}
        enableOnAndroid={true}
        enableAutomaticScroll={true}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.avatarContainer}>
          <MyInfoAvatar />
        </View>
        <View style={styles.formContainer}>
          <MyInfoForm />
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 30,
  },
  keyboardAwareScrollView: {
    flexGrow: 1,
    flexShrink: 0,
    justifyContent: "flex-start",
  },
  avatarContainer: {
    borderBottomWidth: 1,
    borderBottomColor: theme.border,
  },
  formContainer: {
    marginVertical: 10,
  },
});
