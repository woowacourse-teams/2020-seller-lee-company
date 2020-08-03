/**
 * @author kouz95
 */

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import SelectBuyerScreen from "../../screens/SelectBuyerScreen";

const Stack = createStackNavigator();

export default function SampleNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SelectBuyerScreen"
        component={SelectBuyerScreen}
        initialParams={{
          articleId: 99,
          title: "맥북",
          photo:
            "https://avatars1.githubusercontent.com/u/48052622?s=400&u=a6aefc01e1ed6d8407e868a66227716d1813182b&v=4",
        }}
      />
    </Stack.Navigator>
  );
}
