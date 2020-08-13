import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ChatScreen from "../../screens/ChatScreen";
import CategoryNavigation from "./CategoryNavigation";
import ArticleFormOptionsModal from "../Article/ArticleFormOptionsModal";
import ArticleFormNavigation from "./ArticleFormNavigation";
import ArticleNavigation from "./ArticleNavigation";
import SampleNavigation from "./SampleNavigation";

const Tab = createBottomTabNavigator();

function getTabBarVisibility(route: any) {
  const routeName = route.state
    ? route.state.routes[route.state.index].name
    : "";

  return routeName !== "ArticleDetailScreen";
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
        component={ArticleFormNavigation}
        options={{
          tabBarVisible: false,
          tabBarButton: () => <ArticleFormOptionsModal />,
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
        component={SampleNavigation}
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
