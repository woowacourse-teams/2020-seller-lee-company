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
  useSetRecoilState,
} from "recoil/dist";
import { profileAPI } from "../api/api";
import {
  myInfoAvatarState,
  myInfoInitialState,
  myInfoModalState,
  myInfoNicknameDuplicatedState,
  myInfoNicknameState,
  myInfoSubmitState,
} from "../states/myInfoState";
import {
  isBlank,
  isDuplicatedNickname,
  isValidNickname,
} from "../nicknameValidator";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  memberAvatarState,
  memberNicknameState,
  memberProfileState,
} from "../states/memberState";
import MyInfoModal from "../components/Common/Modal/MyInfoModal";

type MyInfoScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<HomeStackParam, "MyInfoScreen">,
  StackNavigationProp<RootStackParam, "HomeStack">
>;

export default function MyInfoScreen() {
  const navigation = useNavigation<MyInfoScreenNavigationProp>();

  const setMyInfoInitialState = useSetRecoilState(myInfoInitialState);
  const setNicknameDuplicatedState = useSetRecoilState(
    myInfoNicknameDuplicatedState,
  );
  const { nickname: originNickname } = useRecoilValue(memberProfileState);
  const myInfoNickname = useRecoilValue(myInfoNicknameState);
  const myInfoAvatar = useRecoilValue(myInfoAvatarState);

  const [memberNickname, setMemberNickname] = useRecoilState(
    memberNicknameState,
  );
  const [memberAvatar, setMemberAvatar] = useRecoilState(memberAvatarState);
  const setMyInfoModalState = useSetRecoilState(myInfoModalState);

  const resetMyInfoSubmit = useResetRecoilState(myInfoSubmitState);
  const resetMyInfoNickname = useResetRecoilState(myInfoNicknameState);

  const onPressCompleteButton = async () => {
    if (isBlank(myInfoNickname) || !isValidNickname(myInfoNickname)) {
      return;
    }

    if (myInfoNickname !== originNickname) {
      const data = await isDuplicatedNickname(myInfoNickname);
      if (data) {
        setNicknameDuplicatedState(true);
        return;
      }
    }

    await profileAPI.put({ nickname: myInfoNickname, avatar: myInfoAvatar });
    setMemberNickname(myInfoNickname);
    setMemberAvatar(myInfoAvatar);
    resetForm();
    setMyInfoModalState(true);
  };

  const resetForm = () => {
    resetMyInfoNickname();
    resetMyInfoSubmit();
  };

  const isValidateSubmit = () => {
    if (memberNickname === myInfoNickname && memberAvatar === myInfoAvatar) {
      setMyInfoInitialState(true);
      return false;
    }
    setMyInfoInitialState(false);
    return !isBlank(myInfoNickname) && isValidNickname(myInfoNickname);
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
  }, [myInfoNickname, myInfoAvatar]);

  return (
    <View style={styles.container}>
      <MyInfoModal />
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
