import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RootStackParam } from "../../types/types";
import { Entypo } from "@expo/vector-icons";
import colors from "../../colors";
import { DeviceStorage } from "../../auth/DeviceStorage";
import { memberAPI } from "../../api/api";
import { useSetRecoilState } from "recoil/dist";
import { memberNicknameState } from "../../states/memberState";
import { StackNavigationProp } from "@react-navigation/stack";

type AuthButtonNavigationProp = StackNavigationProp<
  RootStackParam,
  "AuthScreen"
>;

export default function AuthButton() {
  const navigation = useNavigation<AuthButtonNavigationProp>();

  const setMemberNickname = useSetRecoilState(memberNicknameState);

  const onPressButton = async () => {
    const response = await DeviceStorage.getToken();

    if (response !== null) {
      const { data } = await memberAPI.getNickname();
      setMemberNickname(data);
      navigation.navigate("HomeStack");
    } else {
      navigation.navigate("AuthScreen");
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPressButton}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>시작하기</Text>
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
    borderRadius: 100,
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
  },
});
