import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ArticleCreateScreen from "../../screens/ArticleCreateScreen";
import ArticleContentsFormScreen from "../../screens/ArticleContentsFormScreen";
import CategoryChoiceScreen from "../../screens/CategoryChoiceScreen";

const Stack = createStackNavigator();

export default function ArticleFormNavigation() {
  return (
    <Stack.Navigator initialRouteName="ArticleCreateScreen">
      <Stack.Screen name="ArticleFormScreen" component={ArticleCreateScreen} />
      <Stack.Screen
        name="ArticleContentsFormScreen"
        component={ArticleContentsFormScreen}
      />
      <Stack.Screen
        name="CategoryChoiceScreen"
        component={CategoryChoiceScreen}
      />
    </Stack.Navigator>
  );
}
