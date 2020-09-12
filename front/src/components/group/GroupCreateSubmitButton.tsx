import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  groupCreationNameState,
  groupEntranceCodeState,
  groupNameExistState,
} from "../../states/groupState";
import theme from "../../colors";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParam } from "../../types/types";
import { useNavigation } from "@react-navigation/native";

type GroupCreateSubmitButtonNavigationProp = StackNavigationProp<
  RootStackParam,
  "GroupCreateScreen"
>;

export default function GroupCreateSubmitButton() {
  const navigation = useNavigation<GroupCreateSubmitButtonNavigationProp>();
  const groupCreationName = useRecoilValue(groupCreationNameState);
  const [isGroupNameExist, setIsGroupNameExist] = useRecoilState(
    groupNameExistState,
  );
  const setGroupEntranceCode = useSetRecoilState(groupEntranceCodeState);

  const onCreateGroup = () => {
    alert(
      `그룹 이름 : ${groupCreationName}` +
        "\n\n" +
        "여기서 그룹 생성 api에 호출\n" +
        "response를 통해 기존에 존재하는 이름일 경우 페이지 잔류, 에러 메시지 출력\n" +
        "생성 가능 이름일 경우 다음 페이지로 이동",
    );
    setIsGroupNameExist(false);
    setGroupEntranceCode("445079");
    // 만약 이름이 이미 존재할 경우 -> groupNameExistState 설정 필요
    navigation.navigate("GroupCreateCompleteScreen");
  };

  const dynamicStyles = StyleSheet.create({
    submitButton: {
      flex: 1,
      backgroundColor: groupCreationName.length === 0 ? "grey" : theme.primary,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 100,
    },
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity
        disabled={groupCreationName.length === 0}
        style={dynamicStyles.submitButton}
        onPress={onCreateGroup}
      >
        <Text style={styles.createSubmitText}>생성하기</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    aspectRatio: 6,
  },
  createSubmitText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
});
