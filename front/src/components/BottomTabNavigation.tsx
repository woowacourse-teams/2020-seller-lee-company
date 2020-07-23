/**
 * @author begaonnuri
 */

import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ChatScreen from "../screens/ChatScreen";
import ProfileScreen from "../screens/ProfileScreen";
import CategoryNavigation from "./CategoryNavigation";
import ArticleCreateOptionsModal from "./ArticleCreateOptionsModal";
import ArticleCreateNavigation from "./ArticleCreateNavigation";
import FeedNavigation from "./FeedNavigation";

const Tab = createBottomTabNavigator();

export default function BottomTabNavigation() {
  return (
    <Tab.Navigator
      initialRouteName="홈"
      tabBarOptions={{ activeTintColor: "black" }}
    >
      <Tab.Screen
        name="홈"
        component={FeedNavigation}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="home-outline"
              size={26}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="카테고리"
        component={CategoryNavigation}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="file-document-box-outline"
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="글쓰기"
        component={ArticleCreateNavigation}
        options={{
          tabBarVisible: false,
          tabBarButton: () => <ArticleCreateOptionsModal />,
        }}
      />
      <Tab.Screen
        name="채팅"
        component={ChatScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="chat-outline"
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="프로필"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="account-circle-outline"
              size={24}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
