/**
 * @author begaonnuri
 */

import React from "react";
import ArticleCreateScreen from "../screens/ArticleCreateScreen";
import CategoryChoiceScreen from "../screens/CategoryChoiceScreen";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function ArticleCreateNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ArticleCreateScreen"
        component={ArticleCreateScreen}
      />
      <Stack.Screen
        name="CategoryChoiceScreen"
        component={CategoryChoiceScreen}
      />
    </Stack.Navigator>
  );
}
