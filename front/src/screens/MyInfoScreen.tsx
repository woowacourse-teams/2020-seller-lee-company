import React, { useLayoutEffect } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { HeaderBackButton } from "@react-navigation/stack";
import { AntDesign, EvilIcons } from "@expo/vector-icons";
import { MyInfoScreenNavigationProp } from "../types/types";
import colors from "../colors";
import MyInfoAvatar from "../components/Profile/MyInfoAvatar";
import MyInfoForm from "../components/Profile/MyInfoForm";
import { useRecoilValue, useResetRecoilState } from "recoil/dist";
import {
  memberInfoAvatarState,
  memberInfoConfirmState,
  memberInfoPasswordState,
  memberProfileState,
} from "../states/memberState";
import { profileAPI } from "../api/api";

export default function MyInfoScreen() {
  const navigation = useNavigation<MyInfoScreenNavigationProp>();

  const { nickname } = useRecoilValue(memberProfileState);
  // const nickname = useRecoilValue(memberInfoNicknameState); 일단 닉네임 수정불가
  const password = useRecoilValue(memberInfoPasswordState);
  const confirm = useRecoilValue(memberInfoConfirmState);
  const avatar = useRecoilValue(memberInfoAvatarState);

  // const resetNickname = useResetRecoilState(memberInfoNicknameState); 일단 닉네임 수정불가
  const resetPassword = useResetRecoilState(memberInfoPasswordState);
  const resetConfirm = useResetRecoilState(memberInfoConfirmState);
  const resetAvatar = useResetRecoilState(memberInfoAvatarState);

  const onPressCompleteButton = async () => {
    if (password !== confirm) {
      alert("비밀번호와 확인이 일치하지 않습니다.");
    } else {
      navigation.goBack();
      await profileAPI.put({ password, avatar });
      resetForm();
    }
  };

  const resetForm = () => {
    // resetNickname();
    resetPassword();
    resetConfirm();
    resetAvatar();
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "내 정보 수정",
      headerLeft: () => (
        <HeaderBackButton
          labelVisible={false}
          onPress={navigation.goBack}
          backImage={() => (
            <EvilIcons name="chevron-left" size={35} color={"grey"} />
          )}
        />
      ),
      headerLeftContainerStyle: { paddingLeft: 10 },
      headerRight: () => (
        <TouchableOpacity onPress={onPressCompleteButton}>
          <AntDesign name="check" size={24} color={colors.primary} />
        </TouchableOpacity>
      ),
      headerRightContainerStyle: { paddingRight: 20 },
    });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <MyInfoAvatar />
      </View>
      <View style={styles.formContainer}>
        <MyInfoForm />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  avatarContainer: {
    flex: 1,
  },
  formContainer: {
    flex: 3,
  },
});
