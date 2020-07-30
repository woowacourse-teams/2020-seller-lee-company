/**
 * @author joseph415
 */

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import FeedHomeScreen from "../screens/FeedHomeScreen";
import SellerLeeScreen from "../screens/SellerLeeScreen";
import ArticleDetailScreen from "../screens/ArticleDetailScreen";
import ChatRoomScreen from "../screens/ChatRoomScreen";

export type ArticleNavigationParamList = {
  FeedHome: undefined;
  SellerLee: undefined;
  FeedDetail: { article_id: number };
  ChatRoom: undefined;
};

const Stack = createStackNavigator<ArticleNavigationParamList>();

export default function ArticleNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="FeedHome" component={FeedHomeScreen} />
      <Stack.Screen name="SellerLee" component={SellerLeeScreen} />
      <Stack.Screen name="FeedDetail" component={ArticleDetailScreen} />
      <Stack.Screen name="ChatRoom" component={ChatRoomScreen} />
    </Stack.Navigator>
  );
}
