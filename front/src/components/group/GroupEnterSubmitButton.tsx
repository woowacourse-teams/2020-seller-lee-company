import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import theme from "../../colors";
import { useRecoilValue, useResetRecoilState } from "recoil";
import {
  groupCreationNameState,
  groupEntranceCodeState,
} from "../../states/groupState";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParam } from "../../types/types";
import { useNavigation } from "@react-navigation/native";

type GroupEnterSubmitButtonRouteName =
  | "GroupEnterScreen"
  | "GroupCreateCompleteScreen";

type GroupEnterSubmitButtonNavigationProp = StackNavigationProp<
  RootStackParam,
  GroupEnterSubmitButtonRouteName
>;

export default function GroupEnterSubmitButton() {
  const VALID_ENTRANCE_CODE_LENGTH = 6;

  const navigation = useNavigation<GroupEnterSubmitButtonNavigationProp>();

  const groupEntranceCode = useRecoilValue(groupEntranceCodeState);
  const resetGroupEntranceCode = useResetRecoilState(groupEntranceCodeState);
  const resetGroupCreationName = useResetRecoilState(groupCreationNameState);

  const isInvalidEntranceCode = () => {
    return groupEntranceCode.length !== VALID_ENTRANCE_CODE_LENGTH;
  };

  const onEnterGroup = () => {
    alert("그룹 코드를 통해 조직 입장 요청을 보낸다.");
    resetGroupEntranceCode();
    resetGroupCreationName();
    navigation.reset({
      index: 0,
      routes: [{ name: "HomeStack" }],
    });
  };

  const dynamicStyles = StyleSheet.create({
    submitButton: {
      flex: 1,
      backgroundColor: isInvalidEntranceCode() ? "grey" : theme.primary,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 100,
    },
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity
        disabled={isInvalidEntranceCode()}
        style={dynamicStyles.submitButton}
        onPress={onEnterGroup}
      >
        <Text style={styles.enterSubmitText}>입장하기</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    aspectRatio: 6,
  },
  enterSubmitText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
});
