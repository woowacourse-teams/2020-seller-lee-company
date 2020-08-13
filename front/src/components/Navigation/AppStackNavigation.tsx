/**
 * @author lxxjn0
 */

import React from "react";
import {
  createStackNavigator,
  StackCardInterpolationProps,
} from "@react-navigation/stack";
import LoginScreen from "../../screens/LoginScreen";
import TeaserScreen from "../../screens/TeaserScreen";
import AuthScreen from "../../screens/AuthScreen";

const LoginStack = createStackNavigator();

const forFade = ({ current }: StackCardInterpolationProps) => ({
  cardStyle: {
    opacity: current.progress,
  },
});

export default function AppStackNavigation() {
  return (
    <LoginStack.Navigator headerMode={"screen"}>
      <LoginStack.Screen
        name={"TeaserScreen"}
        component={TeaserScreen}
        options={{
          headerShown: false,
        }}
      />
      <LoginStack.Screen
        name={"AuthScreen"}
        component={AuthScreen}
        options={{
          headerTransparent: true,
          cardStyleInterpolator: forFade,
        }}
      />
      <LoginStack.Screen name={"LoginScreen"} component={LoginScreen} />
    </LoginStack.Navigator>
  );
}
