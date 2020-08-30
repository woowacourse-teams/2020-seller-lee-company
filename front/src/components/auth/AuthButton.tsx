import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TeaserScreenNavigationProp } from "../../types/types";
import { Entypo } from "@expo/vector-icons";
import colors from "../../colors";
import { DeviceStorage } from "../../auth/DeviceStorage";
import { memberAPI } from "../../api/api";
import { useSetRecoilState } from "recoil/dist";
import { memberNicknameState } from "../../states/memberState";
import { loadingState } from "../../states/loadingState";

interface KakakoLoginWebViewProp {
  toggleModal: Function;
}

export default function AuthButton({ toggleModal }: KakakoLoginWebViewProp) {
  const navigation = useNavigation<TeaserScreenNavigationProp>();
  const setIsLoading = useSetRecoilState(loadingState);
  const setMemberNickname = useSetRecoilState(memberNicknameState);

  const onPressButton = async () => {
    setIsLoading(true);
    const token = await DeviceStorage.getToken();
    console.log("AuthButton token: " + token);

    if (token) {
      try {
        const { data } = await memberAPI.getNickname();
        setMemberNickname(data);
        navigation.navigate("BottomTabNavigation");
        console.log("AuthButton data: " + data);
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
