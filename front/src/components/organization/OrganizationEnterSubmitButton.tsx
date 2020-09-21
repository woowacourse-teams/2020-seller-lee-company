import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import theme from "../../colors";
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";
import {
  noOrganizationState,
  organizationAlreadyRegisteredState,
  organizationCreationNameState,
  organizationExistState,
  organizationListState,
  organizationState,
} from "../../states/organizationState";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParam } from "../../types/types";
import { useNavigation } from "@react-navigation/native";
import { memberOrganizationAPI, organizationAPI } from "../../api/api";

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

  const setOrganizationList = useSetRecoilState(organizationListState);
  const setOrganizationAlreadyRegistered = useSetRecoilState(
    organizationAlreadyRegisteredState,
  );
  const { code } = useRecoilValue(organizationState);

  const setOrganizationExist = useSetRecoilState(organizationExistState);
  const setNoOrganization = useSetRecoilState(noOrganizationState);

  const resetOrganization = useResetRecoilState(organizationState);
  const resetOrganizationCreationName = useResetRecoilState(
    organizationCreationNameState,
  );

  const isInvalidEntranceCode = () => {
    return code.length !== VALID_ENTRANCE_CODE_LENGTH;
  };

  const getOrganizationList = async () => {
    try {
      const { data, status } = await organizationAPI.showAll();

      if (status === 200 && data.length !== 0) {
        setOrganizationList(data);
      }
    } catch (error) {
      console.warn(
        "OrganizationEnterSubmitButton: organizationAPI showAll error",
      );
      console.warn(error);
    }
  };

  const onEnterOrganization = async () => {
    try {
      const { status } = await memberOrganizationAPI.register({
        code,
      });

      if (status === 201) {
        await getOrganizationList();
        setOrganizationExist(true);
        resetOrganization();
        resetOrganizationCreationName();
        setNoOrganization(false);
        setOrganizationAlreadyRegistered(false);
        navigation.reset({
          index: 0,
          routes: [{ name: "HomeStack" }],
        });
      }
    } catch (e) {
      resetOrganization();
      setOrganizationExist(false);
      setOrganizationAlreadyRegistered(true);
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
