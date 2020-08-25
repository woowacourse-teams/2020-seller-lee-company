import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import CategoryHomeScreen from "../../screens/CategoryHomeScreen";
import { CategoryParamList } from "../../types/types";
import HomeCategorySelectScreen from "../../screens/HomeCategorySelectScreen";
import ArticleDetailScreen from "../../screens/ArticleDetailScreen";

const Stack = createStackNavigator<CategoryParamList>();

export default function CategoryNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeCategorySelect"
        component={HomeCategorySelectScreen}
      />
      <Stack.Screen name="CategoryHome" component={CategoryHomeScreen} />
      <Stack.Screen name="ArticleDetail" component={ArticleDetailScreen} />
    </Stack.Navigator>
  );
}
