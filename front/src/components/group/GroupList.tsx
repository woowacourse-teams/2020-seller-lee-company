import React from "react";
import { FlatList } from "react-native";
import GroupItem from "./GroupItem";
import { useRecoilValue } from "recoil/dist";
import { groupListState } from "../../states/groupState";

export default function GroupList() {
  const groups = useRecoilValue(groupListState);
  return (
    <FlatList
      data={groups}
      renderItem={({ item }) => <GroupItem title={item.name} />}
      keyExtractor={(item, index) => `${index}`}
    />
  );
}
