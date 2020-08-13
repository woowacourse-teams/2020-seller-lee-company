import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SalesHistoryScreen from "../../screens/SalesHistoryScreen";
import ProfileScreen from "../../screens/ProfileScreen";
import { ProfileNavigationParamList } from "../../types/types";

const Stack = createStackNavigator<ProfileNavigationParamList>();

export default function ProfileNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="SalesHistoryScreen" component={SalesHistoryScreen} />
    </Stack.Navigator>
  );
}
