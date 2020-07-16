/**
 * @author begaonnuri, joseph415
 */

import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import HomeScreen from "../screens/HomeScreen";
import WriteScreen from "../screens/WriteScreen";
import ChatScreen from "../screens/ChatScreen";
import ProfileScreen from "../screens/ProfileScreen";
import CategoryNavigation from "./CategoryNavigation";

const Tab = createBottomTabNavigator();

export default function BottomTabNavigation() {
  return (
    <Tab.Navigator
      initialRouteName="홈"
      tabBarOptions={{ activeTintColor: "black" }}
    >
      <Tab.Screen
        name="홈"
        component={HomeScreen}
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
        component={WriteScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="pencil-box-outline"
              size={24}
              color={color}
            />
          ),
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
