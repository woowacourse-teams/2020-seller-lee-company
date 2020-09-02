import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { RootStackParam } from "../../types/types";
import TeaserScreen from "../../screens/TeaserScreen";
import AuthScreen from "../../screens/AuthScreen";
import JoinScreen from "../../screens/JoinScreen";
import HomeStack from "./HomeStack";

const Stack = createStackNavigator<RootStackParam>();

export default function RootStack() {
  return (
    <Stack.Navigator initialRouteName={"TeaserScreen"} headerMode={"screen"}>
      <Stack.Screen name={"TeaserScreen"} component={TeaserScreen} />
      <Stack.Screen name={"AuthScreen"} component={AuthScreen} />
      <Stack.Screen name={"JoinScreen"} component={JoinScreen} />
      <Stack.Screen
        name={"HomeStack"}
        component={HomeStack}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
