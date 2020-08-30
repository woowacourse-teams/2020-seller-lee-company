import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import TeaserScreen from "../../screens/TeaserScreen";
import BottomTabNavigation from "./BottomTabNavigation";
import JoinScreen from "../../screens/JoinScreen";

const LoginStack = createStackNavigator();

export default function AppStackNavigation() {
  return (
    <LoginStack.Navigator
      initialRouteName={"TeaserScreen"}
      headerMode={"screen"}
    >
      <LoginStack.Screen name={"TeaserScreen"} component={TeaserScreen} />
      {/*<LoginStack.Screen name={"AuthScreen"} component={AuthScreen} />*/}
      <LoginStack.Screen name={"JoinScreen"} component={JoinScreen} />
      <LoginStack.Screen
        name={"BottomTabNavigation"}
        component={BottomTabNavigation}
        options={{ headerShown: false }}
      />
    </LoginStack.Navigator>
  );
}
