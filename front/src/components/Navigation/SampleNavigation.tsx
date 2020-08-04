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
          articleId: 51,
          title: "맥북",
          photo:
            "https://seller-lee-bucket.s3.ap-northeast-2.amazonaws.com/images/1_1596288314232.jpeg",
        }}
      />
    </Stack.Navigator>
  );
}
