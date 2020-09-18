import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Organization } from "../../types/types";
import { Feather } from "@expo/vector-icons";
import theme from "../../colors";
import { useSetRecoilState } from "recoil";
import {
  deleteOrganizationState,
  organizationDeleteModalState,
} from "../../states/organizationState";

interface OrganizationManageItemProps {
  item: Organization;
}

export default function OrganizationManageItem({
  item,
}: OrganizationManageItemProps) {
  const setDeleteOrganization = useSetRecoilState(deleteOrganizationState);
  const setOrganizationDeleteModal = useSetRecoilState(
    organizationDeleteModalState,
  );

  const onPressDelete = () => {
    setDeleteOrganization(item);
    setOrganizationDeleteModal(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.nameAndCodeContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.code}>입장 코드: {item.code}</Text>
      </View>
      <TouchableOpacity style={styles.iconContainer} onPress={onPressDelete}>
        <Feather name="log-out" size={22} color="grey" style={styles.icon} />
        <Text style={styles.signOut}>나가기</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    aspectRatio: 4.5,
    paddingHorizontal: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomColor: theme.border,
    borderBottomWidth: 1,
  },
  nameAndCodeContainer: {
    alignItems: "flex-start",
    justifyContent: "center",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  code: {
    fontSize: 14,
    fontWeight: "bold",
    color: theme.primary,
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    marginBottom: 5,
  },
  signOut: {
    fontSize: 12,
    fontWeight: "bold",
    color: "grey",
  },
});
