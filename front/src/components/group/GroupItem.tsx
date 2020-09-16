import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useRecoilState, useRecoilValue } from "recoil/dist";
import { articleSelectedGroupState } from "../../states/articleState";
import theme from "../../colors";
import { Group } from "../../types/types";
import { groupListState } from "../../states/groupState";

interface CategoryItemProps {
  groupName: string;
}

export default function GroupItem({ groupName }: CategoryItemProps) {
  const [selectedGroup, setSelectedGroup] = useRecoilState(
    articleSelectedGroupState,
  );
  const myGroups = useRecoilValue(groupListState);

  const exist = () => {
    return selectedGroup.some((item: Group) => item.name === groupName);
  };

  const onClickGroup = () => {
    if (exist()) {
      remove();
    } else {
      add();
    }
  };

  const add = () => {
    setSelectedGroup(
      selectedGroup.concat(myGroups.filter((item) => item.name === groupName)),
    );
  };

  const remove = () => {
    setSelectedGroup(selectedGroup.filter((item) => item.name !== groupName));
  };

  return (
    <View style={styles.container}>
      <Text
        style={exist() ? styles.selected : styles.nonSelected}
        onPress={onClickGroup}
      >
        {exist() ? `V ${groupName}` : `${groupName}`}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: theme.border,
  },
  selected: {
    fontSize: 16,
    color: theme.primary,
  },
  nonSelected: {
    fontSize: 16,
    color: "black",
  },
});
