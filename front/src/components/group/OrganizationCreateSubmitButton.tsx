import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  organizationCreationNameState,
  organizationEntranceCodeState,
  organizationNameExistState,
} from "../../states/organizationState";
import theme from "../../colors";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParam } from "../../types/types";
import { useNavigation } from "@react-navigation/native";

type OrganizationCreateSubmitButtonNavigationProp = StackNavigationProp<
  RootStackParam,
  "OrganizationCreateScreen"
>;

export default function OrganizationCreateSubmitButton() {
  const navigation = useNavigation<
    OrganizationCreateSubmitButtonNavigationProp
  >();
  const organizationCreationName = useRecoilValue(
    organizationCreationNameState,
  );
  const [isOrganizationNameExist, setIsOrganizationNameExist] = useRecoilState(
    organizationNameExistState,
  );
  const setOrganizationEntranceCode = useSetRecoilState(
    organizationEntranceCodeState,
  );

  const onCreateOrganization = () => {
    alert(
      `그룹 이름 : ${organizationCreationName}` +
        "\n\n" +
        "여기서 그룹 생성 api에 호출\n" +
        "response를 통해 기존에 존재하는 이름일 경우 페이지 잔류, 에러 메시지 출력\n" +
        "생성 가능 이름일 경우 다음 페이지로 이동",
    );
    setIsOrganizationNameExist(false);
    setOrganizationEntranceCode("445079");
    // 만약 이름이 이미 존재할 경우 -> groupNameExistState 설정 필요
    navigation.navigate("OrganizationCreateCompleteScreen");
  };

  const dynamicStyles = StyleSheet.create({
    submitButton: {
      flex: 1,
      backgroundColor:
        organizationCreationName.length === 0 ? "grey" : theme.primary,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 100,
    },
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity
        disabled={organizationCreationName.length === 0}
        style={dynamicStyles.submitButton}
        onPress={onCreateOrganization}
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
