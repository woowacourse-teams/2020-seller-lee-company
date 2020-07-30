/**
 * @author begaonnuri, joseph415
 */

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import CategoryHomeScreen from "../screens/CategoryHomeScreen";
import CategoryDetailScreen from "../screens/CategoryDetailScreen";
import SearchScreen from "../screens/SearchScreen";
import { CategoryParamList } from "../types/types";

const Stack = createStackNavigator<CategoryParamList>();

export default function CategoryNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="CategoryHome" component={CategoryHomeScreen} />
      <Stack.Screen name="CategoryDetail" component={CategoryDetailScreen} />
      <Stack.Screen name="Search" component={SearchScreen} />
    </Stack.Navigator>
  );
}
