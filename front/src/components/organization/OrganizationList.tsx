import React from "react";
import { FlatList } from "react-native";
import OrganizationItem from "./OrganizationItem";
import { useRecoilValue } from "recoil/dist";
import { organizationListState } from "../../states/organizationState";

interface GroupListProps {
  isGroupFiltering: boolean;
}

export default function OrganizationList({ isGroupFiltering }: GroupListProps) {
  const myGroupList = useRecoilValue(organizationListState);

  return (
    <FlatList
      data={myGroupList}
      renderItem={({ item }) => (
        <OrganizationItem isGroupFiltering={isGroupFiltering} group={item} />
      )}
      keyExtractor={(item, index) => `${index}`}
    />
  );
}
