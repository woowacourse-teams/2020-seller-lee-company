import React from "react";
import { FlatList } from "react-native";
import GroupItem from "./GroupItem";
import { useRecoilValue } from "recoil/dist";
import { groupListState } from "../../states/groupState";

interface GroupListProps {
  isGroupFiltering: boolean;
}

export default function GroupList({ isGroupFiltering }: GroupListProps) {
  const myGroupList = useRecoilValue(groupListState);

  return (
    <FlatList
      data={myGroupList}
      renderItem={({ item }) => (
        <GroupItem isGroupFiltering={isGroupFiltering} group={item} />
      )}
      keyExtractor={(item, index) => `${index}`}
    />
  );
}
