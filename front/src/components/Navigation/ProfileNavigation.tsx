/**
 * @author lxxjn0
 */

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { ProfileParamList } from "../../types/types";
import PurchaseScreen from "../../screens/PurchaseScreen";

const Stack = createStackNavigator<ProfileParamList>();

export default function ProfileNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="PurchaseScreen" component={PurchaseScreen} />
    </Stack.Navigator>
  );
}
