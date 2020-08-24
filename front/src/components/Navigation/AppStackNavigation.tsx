/**
 * @author lxxjn0
 */

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../../screens/LoginScreen";
import TeaserScreen from "../../screens/TeaserScreen";
import AuthScreen from "../../screens/AuthScreen";
import BottomTabNavigation from "./BottomTabNavigation";
import JoinScreen from "../../screens/JoinScreen";

const LoginStack = createStackNavigator();

export default function AppStackNavigation() {
  return (
    <LoginStack.Navigator headerMode={"screen"}>
      <LoginStack.Screen name={"TeaserScreen"} component={TeaserScreen} />
      <LoginStack.Screen name={"AuthScreen"} component={AuthScreen} />
      <LoginStack.Screen name={"LoginScreen"} component={LoginScreen} />
      <LoginStack.Screen name={"JoinScreen"} component={JoinScreen} />
      <LoginStack.Screen
        name={"BottomTabNavigation"}
        component={BottomTabNavigation}
        options={{ headerShown: false }}
      />
    </LoginStack.Navigator>
  );
}
