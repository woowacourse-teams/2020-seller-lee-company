import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useRecoilState, useRecoilValue } from "recoil/dist";
import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { articleSelectedGroupState } from "../../states/articleState";
import theme from "../../colors";
import { StackNavigationProp } from "@react-navigation/stack";
import { Group, HomeStackParam, RootStackParam } from "../../types/types";
import { groupListState } from "../../states/groupState";

type CategoryItemNavigationProp = CompositeNavigationProp<
  StackNavigationProp<HomeStackParam, "CategoryChoiceScreen">,
  StackNavigationProp<RootStackParam, "HomeStack">
>;

interface CategoryItemProps {
  title: string;
}

export default function GroupItem({ title }: CategoryItemProps) {
  const navigation = useNavigation<CategoryItemNavigationProp>();
  const [selectedGroup, setSelectedGroup] = useRecoilState(
    articleSelectedGroupState,
  );
  const myGroups = useRecoilValue(groupListState);

  const onClickGroup = () => {
    if (selectedGroup.find((item: Group) => item.name === title)) {
      removeGroup();
    } else {
      addGroup();
    }
  };

  const addGroup = () => {
    setSelectedGroup(
      selectedGroup.concat(myGroups.filter((item) => item.name === title)),
    );
  };

  const removeGroup = () => {
    setSelectedGroup(selectedGroup.filter((item) => item.name !== title));
  };

  return (
    <View style={styles.container}>
      <Text
        style={
          selectedGroup.find((item: Group) => item.name === title)
            ? styles.selected
            : styles.nonSelected
        }
        onPress={onClickGroup}
      >
        {selectedGroup.find((item: Group) => item.name === title)
          ? `V ${title}`
          : `${title}`}
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
