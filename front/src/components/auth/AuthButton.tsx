import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";
import colors from "../../colors";
import { DeviceStorage } from "../../auth/DeviceStorage";
import { organizationAPI, profileAPI } from "../../api/api";
import { useSetRecoilState } from "recoil/dist";
import {
  memberAvatarState,
  memberIdState,
  memberNicknameState,
  memberProfileState,
} from "../../states/memberState";
import { loadingState } from "../../states/loadingState";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParam } from "../../types/types";
import {
  noOrganizationState,
  organizationListState,
} from "../../states/organizationState";

type AuthButtonNavigationProp = StackNavigationProp<
  RootStackParam,
  "TeaserScreen"
>;

interface AuthButtonProps {
  toggleModal: Function;
}

export default function AuthButton({ toggleModal }: AuthButtonProps) {
  const navigation = useNavigation<AuthButtonNavigationProp>();
  const setIsLoading = useSetRecoilState(loadingState);
  const setMemberNickname = useSetRecoilState(memberNicknameState);
  const setMemberId = useSetRecoilState(memberIdState);
  const setMemberAvatar = useSetRecoilState(memberAvatarState);
  const setOrganizationList = useSetRecoilState(organizationListState);
  const setProfile = useSetRecoilState(memberProfileState);
  const setNoOrganization = useSetRecoilState(noOrganizationState);

  const onPressButton = async () => {
    setIsLoading(true);
    const token = await DeviceStorage.getToken();

    if (token) {
      try {
        const { data } = await profileAPI.get();
        setMemberId(data.id);
        setMemberAvatar(data.avatar);
        await isJoinMember(data.nickname);
      } catch (error) {
        toggleModal();
        console.warn(error.response.data.message);
      }
    } else {
      toggleModal();
    }
    setIsLoading(false);
  };

  const isJoinMember = async (nickname: string) => {
    setMemberNickname(nickname);
    setProfile({ avatar: "", score: 0, nickname });

    if (nickname === null) {
      return navigation.navigate("JoinScreen");
    }
    const { data, status } = await organizationAPI.showAll();

    try {
      if (status === 200 && data.length !== 0) {
        setOrganizationList(data);
        return navigation.reset({
          index: 0,
          routes: [{ name: "HomeStack" }],
        });
      } else {
        setNoOrganization(true);
        return navigation.navigate("OrganizationHomeScreen");
      }
    } catch (error) {
      console.warn("AuthButton: organizationAPI.showAll 에러");
      console.warn(error);
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPressButton}>
      <View style={styles.contentContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>카카오톡으로</Text>
          <Text style={styles.title}>시작하기</Text>
        </View>
        <Entypo name="controller-play" size={14} color={"white"} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    aspectRatio: 2.6,
    backgroundColor: colors.others,
    justifyContent: "center",
    borderRadius: 30,
  },
  contentContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginHorizontal: 5,
  },
  title: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 2,
  },
  titleContainer: {},
});
