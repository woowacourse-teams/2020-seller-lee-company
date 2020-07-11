import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import CategoryHomeScreen from "../screens/CategoryHomeScreen";
import CategoryDetailScreen from "../screens/CategoryDetailScreen";

/**
 *
 * @author 터틀, 서브웨이
 */

export type categoryParamList = {
  CategoryHome: undefined;
  CategoryDetail: { title: string } | undefined;
};

const Stack = createStackNavigator<categoryParamList>();

export default function CategoryNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="CategoryHome" component={CategoryHomeScreen} />
      <Stack.Screen
        name="CategoryDetail"
        component={CategoryDetailScreen}
        options={({ route }) => ({ title: route.params?.title })}
      />
    </Stack.Navigator>
  );
}
