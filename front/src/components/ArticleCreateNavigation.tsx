/**
 * @author kouz95
 */

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ArticleCreateScreen from "../screens/ArticleCreateScreen";
import ArticleContentsFormScreen from "../screens/ArticleContentsFormScreen";

const Stack = createStackNavigator();

export default function ArticleCreateNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ArticleCreateHome" component={ArticleCreateScreen} />
      <Stack.Screen
        name="ArticleCreateForm"
        component={ArticleContentsFormScreen}
        options={{
          title: "내용 입력",
        }}
      />
    </Stack.Navigator>
  );
}
