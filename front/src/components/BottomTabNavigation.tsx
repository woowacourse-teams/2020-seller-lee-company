/**
 * @author lxxjn0
 */

import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ChatScreen from "../screens/ChatScreen";
import CategoryNavigation from "./CategoryNavigation";
import ArticleCreateOptionsModal from "./ArticleCreateOptionsModal";
import ArticleCreateNavigation from "./ArticleCreateNavigation";
import LoginScreen from "../screens/LoginScreen";
import ArticleNavigation from "./ArticleNavigation";

const Tab = createBottomTabNavigator();

function getTabBarVisibility(route: any) {
  const routeName = route.state
    ? route.state.routes[route.state.index].name
    : "";

  return routeName !== "FeedDetail";
}

export default function BottomTabNavigation() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{ activeTintColor: "black" }}
    >
      <Tab.Screen
        name="Home"
        component={ArticleNavigation}
        options={({ route }) => ({
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="home-outline"
              size={24}
              color={color}
            />
          ),
          tabBarVisible: getTabBarVisibility(route),
        })}
      />
      <Tab.Screen
        name="Category"
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
        name="Posting"
        component={ArticleCreateNavigation}
        options={{
          tabBarVisible: false,
          tabBarButton: () => <ArticleCreateOptionsModal />,
        }}
      />
      <Tab.Screen
        name="Chat"
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
        name="Profile"
        component={LoginScreen}
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
