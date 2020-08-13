/**
 * @author lxxjn0
 */

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { ProfileParamList } from "../../types/types";
import LoginScreen from "../../screens/LoginScreen";
import JoinScreen from "../../screens/JoinScreen";

const Stack = createStackNavigator<ProfileParamList>();

export default function ProfileNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="JoinScreen" component={JoinScreen} />
    </Stack.Navigator>
  );
}
