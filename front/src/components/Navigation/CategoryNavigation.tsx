import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import CategoryHomeScreen from "../../screens/CategoryHomeScreen";
import { CategoryParamList } from "../../types/types";
import HomeCategorySelectScreen from "../../screens/HomeCategorySelectScreen";
import ArticleDetailScreen from "../../screens/ArticleDetailScreen";
import ArticleDetailImageViewScreen from "../../screens/ArticleDetailImageViewScreen";
import ArticleFormScreen from "../../screens/ArticleFormScreen";

const Stack = createStackNavigator<CategoryParamList>();

export default function CategoryNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeCategorySelectScreen"
        component={HomeCategorySelectScreen}
      />
      <Stack.Screen name="CategoryHomeScreen" component={CategoryHomeScreen} />
      <Stack.Screen
        name="ArticleDetailScreen"
        component={ArticleDetailScreen}
      />
      <Stack.Screen name="ArticleFormScreen" component={ArticleFormScreen} />
      <Stack.Screen
        name="ArticleDetailImageViewScreen"
        component={ArticleDetailImageViewScreen}
      />
    </Stack.Navigator>
  );
}
