import React from "react";
import { FlatList } from "react-native";
import OrganizationItem from "./OrganizationItem";
import { useRecoilValue } from "recoil/dist";
import { organizationListState } from "../../states/organizationState";

export default function OrganizationChatList() {
  const organizationList = useRecoilValue(organizationListState);

  return (
    <FlatList
      data={organizationList}
      renderItem={({ item }) => (
        // @ts-ignore
        <OrganizationItem id={item.id} name={item.name} />
      )}
      keyExtractor={(item, index) => `${index}`}
    />
  );
}
