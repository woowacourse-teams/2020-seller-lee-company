import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";
import colors from "../../colors";
import { DeviceStorage } from "../../auth/DeviceStorage";
import { profileAPI } from "../../api/api";
import { useSetRecoilState } from "recoil/dist";
import { memberNicknameState, memberState } from "../../states/memberState";
import { loadingState } from "../../states/loadingState";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParam } from "../../types/types";

type AuthButtonNavigationProp = StackNavigationProp<
  RootStackParam,
  "AuthScreen"
>;

interface AuthButtonProps {
  toggleModal: Function;
}

export default function AuthButton({ toggleModal }: AuthButtonProps) {
  const navigation = useNavigation<AuthButtonNavigationProp>();
  const setIsLoading = useSetRecoilState(loadingState);
  const setMemberNickname = useSetRecoilState(memberNicknameState);
  const setMemberState = useSetRecoilState(memberState);

  const onPressButton = async () => {
    setIsLoading(true);
    const token = await DeviceStorage.getToken();

    if (token) {
      try {
        const { data } = await profileAPI.get();
        if (data.state === "NOT_JOIN") {
          setMemberState(data.state);
          return navigation.navigate("JoinScreen");
        }
        setMemberNickname(data.nickname);
        navigation.navigate("HomeStack");
      } catch (error) {
        toggleModal();
        console.log(error.response.data.message);
      }
    } else {
      toggleModal();
    }
    setIsLoading(false);
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
