import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import theme from "../../colors";
import { useRecoilValue, useResetRecoilState } from "recoil";
import {
  organizationCreationNameState,
  organizationEntranceCodeState,
} from "../../states/organizationState";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParam } from "../../types/types";
import { useNavigation } from "@react-navigation/native";

type OrganizationEnterSubmitButtonRouteName =
  | "OrganizationEnterScreen"
  | "OrganizationCreateCompleteScreen";

type OrganizationEnterSubmitButtonNavigationProp = StackNavigationProp<
  RootStackParam,
  OrganizationEnterSubmitButtonRouteName
>;

export default function OrganizationEnterSubmitButton() {
  const VALID_ENTRANCE_CODE_LENGTH = 6;

  const navigation = useNavigation<
    OrganizationEnterSubmitButtonNavigationProp
  >();

  const organizationEntranceCode = useRecoilValue(
    organizationEntranceCodeState,
  );
  const resetOrganizationEntranceCode = useResetRecoilState(
    organizationEntranceCodeState,
  );
  const resetOrganizationCreationName = useResetRecoilState(
    organizationCreationNameState,
  );

  const isInvalidEntranceCode = () => {
    return organizationEntranceCode.length !== VALID_ENTRANCE_CODE_LENGTH;
  };

  const onEnterOrganization = () => {
    alert("그룹 코드를 통해 조직 입장 요청을 보낸다.");
    resetOrganizationEntranceCode();
    resetOrganizationCreationName();
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
        onPress={onEnterOrganization}
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
