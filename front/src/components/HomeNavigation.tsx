/**
 * @author begaonnuri
 */

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import SellerLeeScreen from "../screens/SellerLeeScreen";

const Stack = createStackNavigator();

export default function HomeNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="SellerLee" component={SellerLeeScreen} />
    </Stack.Navigator>
  );
}
