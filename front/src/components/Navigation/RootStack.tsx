import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { RootStackParam } from "../../types/types";
import TeaserScreen from "../../screens/TeaserScreen";
import JoinScreen from "../../screens/JoinScreen";
import HomeStack from "./HomeStack";
import OrganizationHomeScreen from "../../screens/OrganizationHomeScreen";
import OrganizationCreateScreen from "../../screens/OrganizationCreateScreen";
import OrganizationCreateCompleteScreen from "../../screens/OrganizationCreateCompleteScreen";
import OrganizationEnterScreen from "../../screens/OrganizationEnterScreen";

const Stack = createStackNavigator<RootStackParam>();

export default function RootStack() {
  return (
    <Stack.Navigator initialRouteName={"TeaserScreen"} headerMode={"screen"}>
      <Stack.Screen name={"TeaserScreen"} component={TeaserScreen} />
      <Stack.Screen name={"JoinScreen"} component={JoinScreen} />
      <Stack.Screen
        name={"OrganizationHomeScreen"}
        component={OrganizationHomeScreen}
      />
      <Stack.Screen
        name={"OrganizationEnterScreen"}
        component={OrganizationEnterScreen}
      />
      <Stack.Screen
        name={"OrganizationCreateScreen"}
        component={OrganizationCreateScreen}
      />
      <Stack.Screen
        name={"OrganizationCreateCompleteScreen"}
        component={OrganizationCreateCompleteScreen}
      />
      <Stack.Screen
        name={"HomeStack"}
        component={HomeStack}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
