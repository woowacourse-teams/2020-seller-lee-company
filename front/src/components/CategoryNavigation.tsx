/**
 * @author begaonnuri, joseph415
 */

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import CategoryHomeScreen from "../screens/CategoryHomeScreen";
import CategoryDetailScreen from "../screens/CategoryDetailScreen";
import SearchScreen from "../screens/SearchScreen";

export type categoryParamList = {
  CategoryHome: undefined;
  CategoryDetail: { title: string };
  Search: undefined;
};

const Stack = createStackNavigator<categoryParamList>();

export default function CategoryNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="CategoryHome" component={CategoryHomeScreen} />
      <Stack.Screen name="CategoryDetail" component={CategoryDetailScreen} />
      <Stack.Screen name="Search" component={SearchScreen} />
    </Stack.Navigator>
  );
}
