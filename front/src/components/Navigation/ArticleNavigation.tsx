import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import FeedHomeScreen from "../../screens/FeedHomeScreen";
import SellerLeeScreen from "../../screens/SellerLeeScreen";
import ChatRoomScreen from "../../screens/ChatRoomScreen";
import { ArticleNavigationParamList } from "../../types/types";
import ArticleDetailScreen from "../../screens/ArticleDetailScreen";
import ArticleDetailImageViewScreen from "../../screens/ArticleDetailImageViewScreen";
import ArticleCreateScreen from "../../screens/ArticleCreateScreen";
import ArticleContentsFormScreen from "../../screens/ArticleContentsFormScreen";
import CategoryChoiceScreen from "../../screens/CategoryChoiceScreen";
import ArticleDetailImageSlider from "../ArticleDetail/ArticleDetailImageSlider";

const Stack = createStackNavigator<ArticleNavigationParamList>();

export default function ArticleNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={FeedHomeScreen} />
      <Stack.Screen name="SellerLee" component={SellerLeeScreen} />
      <Stack.Screen name="ChatRoom" component={ChatRoomScreen} />
      <Stack.Screen
        name="ArticleDetailScreen"
        component={ArticleDetailScreen}
      />
      <Stack.Screen
        name="ArticleDetailImageSlider"
        component={ArticleDetailImageSlider}
      />
      <Stack.Screen
        name="ArticleDetailImageViewScreen"
        component={ArticleDetailImageViewScreen}
      />
      <Stack.Screen name="ArticleFormScreen" component={ArticleCreateScreen} />
      <Stack.Screen
        name="ArticleContentsFormScreen"
        component={ArticleContentsFormScreen}
      />
      <Stack.Screen
        name="CategoryChoiceScreen"
        component={CategoryChoiceScreen}
      />
    </Stack.Navigator>
  );
}
