import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { RootStackParam } from "../../types/types";
import TeaserScreen from "../../screens/TeaserScreen";
import JoinScreen from "../../screens/JoinScreen";
import HomeStack from "./HomeStack";
import GroupHomeScreen from "../../screens/GroupHomeScreen";
import GroupCreateScreen from "../../screens/GroupCreateScreen";
import GroupCreateCompleteScreen from "../../screens/GroupCreateCompleteScreen";
import GroupEnterScreen from "../../screens/GroupEnterScreen";

const Stack = createStackNavigator<RootStackParam>();

export default function RootStack() {
  return (
    <Stack.Navigator initialRouteName={"TeaserScreen"} headerMode={"screen"}>
      <Stack.Screen name={"TeaserScreen"} component={TeaserScreen} />
      <Stack.Screen name={"JoinScreen"} component={JoinScreen} />
      <Stack.Screen name={"GroupHomeScreen"} component={GroupHomeScreen} />
      <Stack.Screen name={"GroupEnterScreen"} component={GroupEnterScreen} />
      <Stack.Screen name={"GroupCreateScreen"} component={GroupCreateScreen} />
      <Stack.Screen
        name={"GroupCreateCompleteScreen"}
        component={GroupCreateCompleteScreen}
      />
      <Stack.Screen
        name={"HomeStack"}
        component={HomeStack}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
