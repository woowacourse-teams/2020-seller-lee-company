import React from "react";
import { StyleSheet, View } from "react-native";
import { useRecoilValue } from "recoil";
import { organizationListState } from "../../states/organizationState";
import OrganizationManageItem from "./OrganizationManageItem";

export default function OrganizationManageList() {
  const organizationList = useRecoilValue(organizationListState);

  return (
    <View style={styles.container}>
      {organizationList.map((value, key) => (
        <OrganizationManageItem item={value} key={key} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
  },
});
