import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import TeaserScreen from "../../screens/TeaserScreen";
import AuthScreen from "../../screens/AuthScreen";
import BottomTabNavigation from "./BottomTabNavigation";
import KakaoLoginButton from "../auth/KakaoLoginButton";

const LoginStack = createStackNavigator();

export default function AppStackNavigation() {
  return (
    <LoginStack.Navigator
      initialRouteName={"TeaserScreen"}
      headerMode={"screen"}
    >
      <LoginStack.Screen name={"TeaserScreen"} component={TeaserScreen} />
      <LoginStack.Screen name={"AuthScreen"} component={AuthScreen} />
      <LoginStack.Screen
        name={"KakaoLoginButton"}
        component={KakaoLoginButton}
      />
      <LoginStack.Screen
        name={"BottomTabNavigation"}
        component={BottomTabNavigation}
        options={{ headerShown: false }}
      />
    </LoginStack.Navigator>
  );
}
