/**
 * @author kouz95
 */

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import SelectBuyerScreen from "../../screens/SelectBuyerScreen";

const Stack = createStackNavigator();

export default function SampleNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SelectBuyerScreen" component={SelectBuyerScreen} />
    </Stack.Navigator>
  );
}
