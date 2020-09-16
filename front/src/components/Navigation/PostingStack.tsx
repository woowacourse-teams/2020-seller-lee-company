import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { PostingStackParam } from "../../types/types";
import CategoryChoiceScreen from "../../screens/CategoryChoiceScreen";
import ArticleFormScreen from "../../screens/ArticleFormScreen";
import ArticleContentsFormScreen from "../../screens/ArticleContentsFormScreen";
import GroupChoiceScreen from "../../screens/GroupChoiceScreen";

const Stack = createStackNavigator<PostingStackParam>();

export default function PostingStack() {
  return (
    <Stack.Navigator
      initialRouteName={"ArticleFormScreen"}
      headerMode={"screen"}
    >
      <Stack.Screen name={"ArticleFormScreen"} component={ArticleFormScreen} />
      <Stack.Screen
        name={"ArticleContentsFormScreen"}
        component={ArticleContentsFormScreen}
      />
      <Stack.Screen
        name={"CategoryChoiceScreen"}
        component={CategoryChoiceScreen}
      />
      <Stack.Screen name={"GroupChoiceScreen"} component={GroupChoiceScreen} />
    </Stack.Navigator>
  );
}
