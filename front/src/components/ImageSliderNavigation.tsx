/**
 * @author kouz95
 */

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ImageSliderScreen from "../screens/ImageSliderScreen";
import ImagesViewScreen from "../screens/ImagesViewScreen";
import { ImageSliderParamList } from "../types/types";

const Stack = createStackNavigator<ImageSliderParamList>();

export default function ImageSliderNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ImageSliderScreen" component={ImageSliderScreen} />
      <Stack.Screen name="ImagesViewScreen" component={ImagesViewScreen} />
    </Stack.Navigator>
  );
}
