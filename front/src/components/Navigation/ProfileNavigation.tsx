import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SalesDetailsScreen from "../../screens/SalesDetailsScreen";
import ProfileScreen from "../../screens/ProfileScreen";

type ProfileNavigationParamList = {
  Profile: undefined;
  SalesDetailsScreen: undefined;
};

const Stack = createStackNavigator<ProfileNavigationParamList>();

export default function ProfileNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="SalesDetailsScreen" component={SalesDetailsScreen} />
    </Stack.Navigator>
  );
}
