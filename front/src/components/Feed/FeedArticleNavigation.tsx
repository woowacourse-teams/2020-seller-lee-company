/**
 * @author joseph415
 */

import React from "react";
import SelectedArticleScreen from "../../screens/SelectedArticleScreen";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../../screens/HomeScreen";
import { FeedParamList } from "../../types/types";

const Stack = createStackNavigator<FeedParamList>();

export default function FeedArticleNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SellerLee" component={HomeScreen} />
      <Stack.Screen name="FeedArticle" component={SelectedArticleScreen} />
    </Stack.Navigator>
  );
}
