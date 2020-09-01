import React, { useEffect } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { HeaderBackButton } from "@react-navigation/stack";
import { AntDesign, EvilIcons } from "@expo/vector-icons";
import { MyInfoScreenNavigationProp } from "../types/types";
import colors from "../colors";
import MyInfoAvatar from "../components/Profile/MyInfoAvatar";
import MyInfoForm from "../components/Profile/MyInfoForm";
import { useRecoilState } from "recoil/dist";
import {
  memberInfoAvatarState,
  memberInfoNicknameState,
} from "../states/memberState";
import { profileAPI } from "../api/api";

export default function MyInfoScreen() {
  const navigation = useNavigation<MyInfoScreenNavigationProp>();

  const [avatar, setAvatar] = useRecoilState(memberInfoAvatarState);
  const [nickname, setNickname] = useRecoilState(memberInfoNicknameState);

  const initNickname = nickname;
  const initAvatar = avatar;

  const onPressCompleteButton = async () => {
    await profileAPI.put({ nickname, avatar });
    navigation.goBack();
  };

  useEffect(() => {
    navigation.setOptions({
      title: "내 정보 수정",
      headerLeft: () => (
        <HeaderBackButton
          labelVisible={false}
          onPress={() => {
            setAvatar(initAvatar);
            setNickname(initNickname);
            navigation.goBack();
          }}
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

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={onPressCompleteButton}>
          <AntDesign name="check" size={24} color={colors.primary} />
        </TouchableOpacity>
      ),
    });
  }, [nickname, avatar]);

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
  keyboardAwareScrollView: {
    flexGrow: 1,
    flexShrink: 0,
    justifyContent: "space-between",
  },
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  avatarContainer: {
    flex: 1,
  },
  formContainer: {
    flex: 3,
  },
});
