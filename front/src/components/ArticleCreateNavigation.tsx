/**
 * @author kouz95
 */

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ArticleCreateScreen from "../screens/ArticleCreateScreen";

const Stack = createStackNavigator();

export default function ArticleCreateNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ArticleCreateHome" component={ArticleCreateScreen} />
    </Stack.Navigator>
  );
}
