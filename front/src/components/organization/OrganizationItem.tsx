import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useRecoilState, useRecoilValue } from "recoil/dist";
import { selectedOrganizationsInArticleFormState } from "../../states/articleState";
import theme from "../../colors";
import { Organization } from "../../types/types";
import {
  organizationListState,
  selectedOrganizationInCategoryState,
  selectedOrganizationInFeedsState,
} from "../../states/organizationState";

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

  const getSelectedItem = () => {
    return isFeed
      ? selectedOrganizationInFeeds
      : selectedOrganizationInCategory;
  };

  const getFilterGroupItem = () => {
    return (
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
    );
  };

  const getArticleFormGroupItem = () => {
    return (
      <Text
        style={exist() ? styles.selected : styles.nonSelected}
        onPress={onClickArticleFormGroup}
      >
        {exist() ? `V ${organization.name}` : `${organization.name}`}
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
