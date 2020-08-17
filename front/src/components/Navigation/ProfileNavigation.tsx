import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SalesHistoryScreen from "../../screens/SalesHistoryScreen";
import ProfileScreen from "../../screens/ProfileScreen";

type ProfileNavigationParamList = {
  Profile: undefined;
  SalesHistoryScreen: undefined;
};

const Stack = createStackNavigator<ProfileNavigationParamList>();

export default function ProfileNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="SalesHistoryScreen" component={SalesHistoryScreen} />
    </Stack.Navigator>
  );
}
