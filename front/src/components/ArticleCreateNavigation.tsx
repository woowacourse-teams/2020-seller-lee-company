/**
 * @author kouz95
 */

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ArticleCreateScreen from "../screens/ArticleCreateScreen";
import ArticleContentsFormScreen from "../screens/ArticleContentsFormScreen";
import CategoryChoiceScreen from "../screens/CategoryChoiceScreen";

const Stack = createStackNavigator();

export default function ArticleCreateNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ArticleCreateHome"
        component={ArticleCreateScreen}
        options={{
          title: "글 쓰기",
        }}
      />
      <Stack.Screen
        name="ArticleCreateForm"
        component={ArticleContentsFormScreen}
        options={{
          title: "내용 입력",
        }}
      />
      <Stack.Screen
        name="CategoryChoiceScreen"
        component={CategoryChoiceScreen}
        options={{
          title: "카테고리 선택",
        }}
      />
    </Stack.Navigator>
  );
}
