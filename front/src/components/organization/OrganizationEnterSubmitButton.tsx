import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import theme from "../../colors";
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";
import {
  organizationCreationNameState,
  organizationExistState,
  organizationState,
} from "../../states/organizationState";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParam } from "../../types/types";
import { useNavigation } from "@react-navigation/native";
import { memberOrganizationAPI } from "../../api/api";

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

  const { code } = useRecoilValue(organizationState);
  const setOrganizationExist = useSetRecoilState(organizationExistState);

  const resetOrganization = useResetRecoilState(organizationState);
  const resetOrganizationCreationName = useResetRecoilState(
    organizationCreationNameState,
  );

  const isInvalidEntranceCode = () => {
    return code.length !== VALID_ENTRANCE_CODE_LENGTH;
  };

  const onEnterOrganization = async () => {
    try {
      const { status } = await memberOrganizationAPI.register({
        code,
      });
      if (status === 201) {
        setOrganizationExist(true);
        resetOrganization();
        resetOrganizationCreationName();
        navigation.reset({
          index: 0,
          routes: [{ name: "HomeStack" }],
        });
      }
    } catch (e) {
      setOrganizationExist(false);
      resetOrganization();
      console.warn("=== OrganizationEnterSubmitButton Error ===");
      console.warn(e);
    }
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
