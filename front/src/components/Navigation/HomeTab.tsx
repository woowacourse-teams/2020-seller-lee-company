import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeTabParam } from "../../types/types";
import ChatScreen from "../../screens/ChatScreen";
import CategoryHomeSelectedScreen from "../../screens/CategoryHomeSelectedScreen";
import FeedHomeScreen from "../../screens/FeedHomeScreen";
import ProfileScreen from "../../screens/ProfileScreen";
import { Feather } from "@expo/vector-icons";
import theme from "../../colors";
import PostingStack from "./PostingStack";
import ArticleFormOptionsModal from "../Article/ArticleFormOptionsModal";

const Tab = createBottomTabNavigator<HomeTabParam>();

export default function HomeTab() {
  return (
    <Tab.Navigator
      initialRouteName={"FeedHomeScreen"}
      tabBarOptions={{
        showLabel: false,
        activeTintColor: theme.secondary,
      }}
    >
      <Tab.Screen
        name={"FeedHomeScreen"}
        component={FeedHomeScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name="home" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name={"CategoryHomeSelectedScreen"}
        component={CategoryHomeSelectedScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name="grid" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name={"PostingStack"}
        component={PostingStack}
        options={{
          tabBarButton: () => {
            return <ArticleFormOptionsModal />;
          },
          tabBarVisible: false,
        }}
      />
      <Tab.Screen
        name={"ChatScreen"}
        component={ChatScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name="message-circle" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name={"ProfileScreen"}
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name="user" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
