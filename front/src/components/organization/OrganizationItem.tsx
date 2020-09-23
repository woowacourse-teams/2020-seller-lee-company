import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useRecoilState, useRecoilValue } from "recoil/dist";
import { selectedOrganizationsInArticleFormState } from "../../states/articleState";
import theme from "../../colors";
import { Organization } from "../../types/types";
import {
  organizationListState,
  selectedOrganizationInCategoryState,
  selectedOrganizationInFeedsState,
} from "../../states/organizationState";
import { Feather } from "@expo/vector-icons";

interface GroupItemProps {
  isGroupFiltering: boolean;
  isFeed: boolean;
  organization: Organization;
}

export default function OrganizationItem({
  isGroupFiltering,
  isFeed,
  organization,
}: GroupItemProps) {
  const [
    selectedOrganizationsInArticleForm,
    setSelectedOrganizationsInArticleForm,
  ] = useRecoilState(selectedOrganizationsInArticleFormState);
  const [
    selectedOrganizationInFeeds,
    setSelectedOrganizationInFeeds,
  ] = useRecoilState(selectedOrganizationInFeedsState);

  const [
    selectedOrganizationInCategory,
    setSelectedOrganizationInCategory,
  ] = useRecoilState(selectedOrganizationInCategoryState);

  const myGroups = useRecoilValue(organizationListState);

  const exist = () => {
    return selectedOrganizationsInArticleForm.some(
      (item: Organization) => item.name === organization.name,
    );
  };

  const onClickFilterGroup = () => {
    isFeed
      ? setSelectedOrganizationInFeeds(organization)
      : setSelectedOrganizationInCategory(organization);
  };

  const onClickArticleFormGroup = () => {
    if (exist()) {
      remove();
    } else {
      add();
    }
  };

  const add = () => {
    setSelectedOrganizationsInArticleForm(
      selectedOrganizationsInArticleForm.concat(
        myGroups.filter((item) => item.name === organization.name),
      ),
    );
  };

  const remove = () => {
    setSelectedOrganizationsInArticleForm(
      selectedOrganizationsInArticleForm.filter(
        (item) => item.name !== organization.name,
      ),
    );
  };

  const getFilterGroupItem = () => {
    return (
      <View>
        <Text
          style={
            getSelectedItem() === organization
              ? styles.selected
              : styles.nonSelected
          }
          onPress={onClickFilterGroup}
        >
          {organization.name}
        </Text>
      </View>
    );
  };

  const getSelectedItem = () => {
    return isFeed
      ? selectedOrganizationInFeeds
      : selectedOrganizationInCategory;
  };

  const getArticleFormGroupItem = () => {
    return (
      <TouchableOpacity onPress={onClickArticleFormGroup}>
        {exist() ? (
          <View style={styles.checkedContainer}>
            <Feather name="check" size={16} color={theme.primary} />
            <Text style={styles.selected}> {organization.name}</Text>
          </View>
        ) : (
          <Text style={styles.nonSelected}>{organization.name}</Text>
        )}
      </TouchableOpacity>
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
  checkedContainer: {
    flexDirection: "row",
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
