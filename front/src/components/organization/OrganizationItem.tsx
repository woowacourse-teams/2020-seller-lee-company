import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useRecoilState, useRecoilValue } from "recoil/dist";
import { selectedGroupsInArticleFormState } from "../../states/articleState";
import theme from "../../colors";
import { Group } from "../../types/types";
import {
  groupListState,
  selectedGroupInFeedsState,
} from "../../states/groupState";

interface GroupItemProps {
  isGroupFiltering: boolean;
  group: Group;
}

export default function GroupItem({ isGroupFiltering, group }: GroupItemProps) {
  const [
    selectedGroupsInArticleForm,
    setSelectedGroupsInArticleForm,
  ] = useRecoilState(selectedGroupsInArticleFormState);
  const [selectedGroupInFeeds, setSelectedGroupInFeeds] = useRecoilState(
    selectedGroupInFeedsState,
  );
  const myGroups = useRecoilValue(groupListState);

  const exist = () => {
    return selectedGroupsInArticleForm.some(
      (item: Group) => item.name === group.name,
    );
  };

  const onClickFilterGroup = () => {
    setSelectedGroupInFeeds(group);
  };

  const onClickArticleFormGroup = () => {
    if (exist()) {
      remove();
    } else {
      add();
    }
  };

  const add = () => {
    setSelectedGroupsInArticleForm(
      selectedGroupsInArticleForm.concat(
        myGroups.filter((item) => item.name === group.name),
      ),
    );
  };

  const remove = () => {
    setSelectedGroupsInArticleForm(
      selectedGroupsInArticleForm.filter((item) => item.name !== group.name),
    );
  };

  const getFilterGroupItem = () => {
    return (
      <Text
        style={
          selectedGroupInFeeds === group ? styles.selected : styles.nonSelected
        }
        onPress={onClickFilterGroup}
      >
        {group.name}
      </Text>
    );
  };

  const getArticleFormGroupItem = () => {
    return (
      <Text
        style={exist() ? styles.selected : styles.nonSelected}
        onPress={onClickArticleFormGroup}
      >
        {exist() ? `V ${group.name}` : `${group.name}`}
      </Text>
    );
  };

  return (
    <View style={styles.container}>
      {isGroupFiltering ? getFilterGroupItem() : getArticleFormGroupItem()}
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
