import React from "react";
import { FlatList } from "react-native";
import GroupItem from "./GroupItem";
import { useRecoilValue } from "recoil/dist";
import { groupListState } from "../../states/groupState";

export default function GroupList() {
  const myGroupList = useRecoilValue(groupListState);
  return (
    <FlatList
      data={myGroupList}
      renderItem={({ item }) => <GroupItem groupName={item.name} />}
      keyExtractor={(item, index) => `${index}`}
    />
  );
}
