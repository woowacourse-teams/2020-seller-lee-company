import React from "react";
import { FlatList, View } from "react-native";
import GroupItem from "./GroupItem";
import { useRecoilValue, useSetRecoilState } from "recoil/dist";
import {
  groupListState,
  selectedGroupInFeedsState,
} from "../../states/groupState";
import { MenuOption } from "react-native-popup-menu";
import { Group } from "../../types/types";

interface GroupListProps {
  isGroupFiltering: boolean;
}
// 게시글 생성 수정시 그룹 선택 창을 스크린에서 다른 걸로 바꾼다면 재사용될 가능성 있어서 우선 같이 둠
// 코드 리팩토링 예정 ㅠㅠ
export default function GroupList({ isGroupFiltering }: GroupListProps) {
  const myGroupList = useRecoilValue(groupListState);
  const setSelectedGroup = useSetRecoilState(selectedGroupInFeedsState);

  function getMenuOption(item: Group) {
    return (
      <MenuOption
        onSelect={() => {
          setSelectedGroup(item);
        }}
        text={item.name}
      />
    );
  }

  return isGroupFiltering ? (
    <View>
      <MenuOption
        onSelect={() => {
          setSelectedGroup({ id: 0, name: "전체" });
        }}
        text="전체"
      />
      {myGroupList.map((item) => getMenuOption(item))}
    </View>
  ) : (
    <FlatList
      data={myGroupList}
      renderItem={({ item }) => <GroupItem groupName={item.name} />}
      keyExtractor={(item, index) => `${index}`}
    />
  );
}
