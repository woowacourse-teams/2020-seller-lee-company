import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BottomTabParams } from "../../types/types";
import FeedHomeScreen from "../../screens/FeedHomeScreen";
import HomeCategorySelectScreen from "../../screens/HomeCategorySelectScreen";
import ProfileScreen from "../../screens/ProfileScreen";
import { Feather } from "@expo/vector-icons";
import ChatScreen from "../../screens/ChatScreen";
import ArticleFormScreen from "../../screens/ArticleFormScreen";
import ArticleFormOptionsModal from "../Article/ArticleFormOptionsModal";

const Tab = createBottomTabNavigator<BottomTabParams>();

export default function BottomTabs() {
  return (
    <Tab.Navigator
      backBehavior={"none"}
      tabBarOptions={{
        showLabel: false,
      }}
    >
      <Tab.Screen
        name={"FeedHomeScreen"}
        component={FeedHomeScreen}
        options={({}) => ({
          tabBarIcon: ({ color }) => (
            <Feather name="home" size={24} color={color} />
          ),
        })}
      />
      <Tab.Screen
        name={"CategoryHomeScreen"}
        component={HomeCategorySelectScreen}
        options={({}) => ({
          tabBarIcon: ({ color }) => (
            <Feather name="grid" size={24} color={color} />
          ),
        })}
      />
      <Tab.Screen
        name={"PostingScreen"}
        component={ArticleFormScreen}
        options={({}) => ({
          // tabBarIcon: ({ color }) => (
          //   <Feather name="edit" size={24} color={color} />
          // ),
          tabBarButton: () => <ArticleFormOptionsModal />,
        })}
      />
      <Tab.Screen
        name={"ChatScreen"}
        component={ChatScreen}
        options={({}) => ({
          tabBarIcon: ({ color }) => (
            <Feather name="message-circle" size={24} color={color} />
          ),
        })}
      />
      <Tab.Screen
        name={"ProfileScreen"}
        component={ProfileScreen}
        options={({}) => ({
          tabBarIcon: ({ color }) => (
            <Feather name="user" size={24} color={color} />
          ),
        })}
      />
    </Tab.Navigator>
  );
}
