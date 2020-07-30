/**
 * @author kouz95
 */

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ArticleDetailScreen from "../screens/ArticleDetailScreen";
import ArticleDetailImageViewScreen from "../screens/ArticleDetailImageViewScreen";
import { ImageSliderParamList } from "../types/types";

const Stack = createStackNavigator<ImageSliderParamList>();

export default function ImageSliderNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ArticleDetailScreen"
        component={ArticleDetailScreen}
      />
      <Stack.Screen
        name="ArticleDetailImageViewScreen"
        component={ArticleDetailImageViewScreen}
      />
    </Stack.Navigator>
  );
}
