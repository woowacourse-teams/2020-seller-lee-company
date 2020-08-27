import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import TeaserScreen from "../../screens/TeaserScreen";
import AuthScreen from "../../screens/AuthScreen";
import JoinScreen from "../../screens/JoinScreen";
import { AppStackParams } from "../../types/types";
import FeedStack from "./FeedStack";

const Stack = createStackNavigator<AppStackParams>();

export default function AppStack() {
  return (
    <Stack.Navigator initialRouteName={"TeaserScreen"} headerMode={"screen"}>
      <Stack.Screen name={"TeaserScreen"} component={TeaserScreen} />
      <Stack.Screen name={"AuthScreen"} component={AuthScreen} />
      <Stack.Screen name={"JoinScreen"} component={JoinScreen} />
      <Stack.Screen
        name={"FeedStack"}
        component={FeedStack}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={"CategoryStack"}
        component={JoinScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={"PostingStack"}
        component={JoinScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={"ChatStack"}
        component={JoinScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={"ProfileStack"}
        component={JoinScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
