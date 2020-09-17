import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  organizationCreationNameState,
  organizationNameExistState,
  organizationState,
} from "../../states/organizationState";
import theme from "../../colors";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParam } from "../../types/types";
import { useNavigation } from "@react-navigation/native";
import { organizationAPI } from "../../api/api";

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
  const setIsOrganizationNameExist = useSetRecoilState(
    organizationNameExistState,
  );
  const setOrganization = useSetRecoilState(organizationState);

  const onCreateOrganization = async () => {
    const { data, status } = await organizationAPI.create({
      name: organizationCreationName,
    });

    if (status === 201) {
      setIsOrganizationNameExist(false);
      setOrganization({
        id: data.id,
        name: data.name,
        code: data.code,
      });
      navigation.navigate("OrganizationCreateCompleteScreen");
    } else {
      console.warn("=== OrganizationCreateSubmitButton Error ===");
      console.warn(status);
      setIsOrganizationNameExist(true);
    }
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
