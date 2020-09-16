import React, { useLayoutEffect } from "react";
import { StyleSheet, View } from "react-native";
import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { HeaderBackButton, StackNavigationProp } from "@react-navigation/stack";
import { Feather } from "@expo/vector-icons";
import { HomeStackParam, RootStackParam } from "../types/types";
import GroupList from "../components/group/GroupList";

type GroupChoiceScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<HomeStackParam, "GroupChoiceScreen">,
  StackNavigationProp<RootStackParam, "HomeStack">
>;

export default function GroupChoiceScreen() {
  const navigation = useNavigation<GroupChoiceScreenNavigationProp>();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "조직 선택",
      headerTitleAlign: "left",
      headerLeft: () => (
        <HeaderBackButton
          labelVisible={false}
          onPress={() => navigation.goBack()}
          backImage={() => (
            <Feather name="chevron-left" size={24} color="black" />
          )}
        />
      ),
      headerLeftContainerStyle: {
        alignItems: "center",
        justifyContents: "center",
        aspectRatio: 1,
      },
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <GroupList isGroupFiltering={false} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
