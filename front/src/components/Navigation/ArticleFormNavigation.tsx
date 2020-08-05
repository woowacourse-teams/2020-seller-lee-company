/**
 * @author kouz95
 */

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ArticleFormScreen from "../../screens/ArticleFormScreen";
import ArticleContentsFormScreen from "../../screens/ArticleContentsFormScreen";
import CategoryChoiceScreen from "../../screens/CategoryChoiceScreen";

const Stack = createStackNavigator();

export default function ArticleFormNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ArticleCreateScreen"
        component={ArticleFormScreen}
        options={{
          title: "글쓰기",
        }}
      />
      <Stack.Screen
        name="ArticleContentsFormScreen"
        component={ArticleContentsFormScreen}
        options={{
          title: "상품 설명",
        }}
      />
      <Stack.Screen
        name="CategoryChoiceScreen"
        component={CategoryChoiceScreen}
        options={{
          title: "카테고리",
        }}
      />
    </Stack.Navigator>
  );
}
