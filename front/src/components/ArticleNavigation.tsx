/**
 * @author joseph415
 */

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import FeedHomeScreen from "../screens/FeedHomeScreen";
import SellerLeeScreen from "../screens/SellerLeeScreen";
import ChatRoomScreen from "../screens/ChatRoomScreen";
import { ArticleNavigationParamList } from "../types/types";
import ArticleDetailScreen from "../screens/ArticleDetailScreen";
import ArticleDetailImageViewScreen from "../screens/ArticleDetailImageViewScreen";

const Stack = createStackNavigator<ArticleNavigationParamList>();

export default function ArticleNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="FeedHome" component={FeedHomeScreen} />
      <Stack.Screen name="SellerLee" component={SellerLeeScreen} />
      <Stack.Screen name="FeedDetail" component={ArticleDetailScreen} />
      <Stack.Screen name="ChatRoom" component={ChatRoomScreen} />
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
