import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ChatScreen from "../../screens/ChatScreen";
import CategoryNavigation from "./CategoryNavigation";
import ArticleNavigation from "./ArticleNavigation";
import ArticleFormNavigation from "./ArticleFormNavigation";
import ArticleFormOptionsModal from "../Article/ArticleFormOptionsModal";
import ProfileNavigation from "./ProfileNavigation";
import { BottomTabNavigationParamList } from "../../types/types";

const Tab = createBottomTabNavigator<BottomTabNavigationParamList>();

function getTabBarVisibility(route: any) {
  const routeName = route.state
    ? route.state.routes[route.state.index].name
    : "FeedHomeScreen";

  return (
    routeName === "FeedHomeScreen" ||
    routeName === "ProfileNavigation" ||
    routeName === "HomeCategorySelectScreen"
  );
}

export default function BottomTabNavigation() {
  return (
    <Tab.Navigator
      initialRouteName="FeedHomeScreen"
      tabBarOptions={{
        activeTintColor: "black",
        labelStyle: { fontSize: 13 },
      }}
    >
      <Tab.Screen
        name="FeedHomeScreen"
        component={ArticleNavigation}
        options={({ route }) => ({
          tabBarLabel: "홈",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="home-outline"
              size={24}
              color={color}
            />
          ),
          // tabBarVisible: getTabBarVisibility(route),
        })}
      />
      <Tab.Screen
        name="CategoryNavigation"
        component={CategoryNavigation}
        options={({ route }) => ({
          tabBarLabel: "카테고리",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="file-document-box-outline"
              size={24}
              color={color}
            />
          ),
          tabBarVisible: getTabBarVisibility(route),
        })}
      />
      <Tab.Screen
        name="ArticleFormNavigation"
        component={ArticleFormNavigation}
        options={{
          tabBarLabel: "글쓰기",
          tabBarButton: () => <ArticleFormOptionsModal />,
          tabBarVisible: false,
        }}
      />
      <Tab.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={{
          tabBarLabel: "채팅",
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
        name="ProfileNavigation"
        component={ProfileNavigation}
        options={({ route }) => ({
          tabBarLabel: "프로필",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="account-circle-outline"
              size={24}
              color={color}
            />
          ),
          tabBarVisible: getTabBarVisibility(route),
        })}
      />
    </Tab.Navigator>
  );
}
