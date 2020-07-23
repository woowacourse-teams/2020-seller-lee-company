/**
 * @author begaonnuri
 */

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import FeedHomeScreen from "../screens/FeedHomeScreen";
import SellerLeeScreen from "../screens/SellerLeeScreen";

const Stack = createStackNavigator();

export default function FeedNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="FeedHome" component={FeedHomeScreen} />
      <Stack.Screen name="SellerLee" component={SellerLeeScreen} />
    </Stack.Navigator>
  );
}