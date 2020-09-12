import React, { useLayoutEffect } from "react";
import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParam } from "../types/types";
import { useNavigation } from "@react-navigation/native";
import { useRecoilValue } from "recoil";
import { memberNicknameState } from "../states/memberState";
import GroupEnterButton from "../components/group/GroupEnterButton";
import GroupCreateButton from "../components/group/GroupCreateButton";

type GroupHomeScreenNavigationProp = StackNavigationProp<
  RootStackParam,
  "GroupHomeScreen"
>;

export default function GroupHomeScreen() {
  const navigation = useNavigation<GroupHomeScreenNavigationProp>();
  const memberNickname = useRecoilValue(memberNicknameState);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{memberNickname}님 반갑습니다 🥳</Text>
        <Text style={styles.description}>
          거래를 시작할 조직을 추가해주세요.
        </Text>
      </View>
      <View style={styles.buttonsContainer}>
        <View style={styles.groupEnterButtonContainer}>
          <GroupEnterButton />
        </View>
        <View style={styles.groupCreateButtonContainer}>
          <GroupCreateButton />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "ios" ? 0 : StatusBar.currentHeight,
    justifyContent: "space-between",
  },
  titleContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 30,
    marginTop: 120,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
  },
  buttonsContainer: {
    flexDirection: "row",
    marginHorizontal: 30,
    marginBottom: 160,
    alignItems: "center",
    justifyContent: "space-between",
  },
  groupEnterButtonContainer: {
    width: "45%",
  },
  groupCreateButtonContainer: {
    width: "45%",
  },
});
