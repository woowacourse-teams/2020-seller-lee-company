import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeStackParam } from "../../types/types";
import CategoryChoiceScreen from "../../screens/CategoryChoiceScreen";
import ArticleDetailScreen from "../../screens/ArticleDetailScreen";
import ArticleFormScreen from "../../screens/ArticleFormScreen";
import ArticleDetailPhotoViewScreen from "../../screens/ArticleDetailPhotoViewScreen";
import ArticleContentsFormScreen from "../../screens/ArticleContentsFormScreen";
import FeedHomeScreen from "../../screens/FeedHomeScreen";
import HomeTab from "./HomeTab";
import CategoryHomeScreen from "../../screens/CategoryHomeScreen";
import PurchaseHistoryScreen from "../../screens/PurchaseHistoryScreen";
import MyInfoScreen from "../../screens/MyInfoScreen";
import SelectBuyerScreen from "../../screens/SelectBuyerScreen";
import EvaluationScreen from "../../screens/EvaluationScreen";
import SalesHistoryScreen from "../../screens/SalesHistoryScreen";
import MyFavoriteScreen from "../../screens/MyFavoriteScreen";
import ProfileScreen from "../../screens/ProfileScreen";
import CategoryHomeSelectedScreen from "../../screens/CategoryHomeSelectedScreen";
import WholeChatScreen from "../../screens/WholeChatScreen";
import ChatScreen from "../../screens/ChatScreen";
import SelectChatScreen from "../../screens/SelectChatScreen";
import OrganizationChoiceScreen from "../../screens/OrganizationChoiceScreen";
import OrganizationManageScreen from "../../screens/OrganizationManageScreen";

const Stack = createStackNavigator<HomeStackParam>();

export default function HomeStack() {
  return (
    <Stack.Navigator initialRouteName={"HomeTab"} headerMode={"screen"}>
      <Stack.Screen
        name={"HomeTab"}
        component={HomeTab}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name={"FeedHomeScreen"} component={FeedHomeScreen} />
      <Stack.Screen
        name={"ArticleDetailScreen"}
        component={ArticleDetailScreen}
      />
      <Stack.Screen
        name={"ArticleDetailPhotoViewScreen"}
        component={ArticleDetailPhotoViewScreen}
      />
      <Stack.Screen name={"ArticleFormScreen"} component={ArticleFormScreen} />
      <Stack.Screen
        name={"ArticleContentsFormScreen"}
        component={ArticleContentsFormScreen}
      />
      <Stack.Screen
        name={"CategoryHomeSelectedScreen"}
        component={CategoryHomeSelectedScreen}
      />
      <Stack.Screen
        name={"CategoryChoiceScreen"}
        component={CategoryChoiceScreen}
      />
      <Stack.Screen
        name={"CategoryHomeScreen"}
        component={CategoryHomeScreen}
      />
      <Stack.Screen name={"SelectChatScreen"} component={SelectChatScreen} />
      <Stack.Screen name={"ChatScreen"} component={ChatScreen} />
      <Stack.Screen name={"WholeChatScreen"} component={WholeChatScreen} />
      <Stack.Screen
        name={"ProfileScreen"}
        component={ProfileScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={"SalesHistoryScreen"}
        component={SalesHistoryScreen}
      />
      <Stack.Screen
        name={"PurchaseHistoryScreen"}
        component={PurchaseHistoryScreen}
      />
      <Stack.Screen name={"SelectBuyerScreen"} component={SelectBuyerScreen} />
      <Stack.Screen name={"EvaluationScreen"} component={EvaluationScreen} />
      <Stack.Screen name={"MyInfoScreen"} component={MyInfoScreen} />
      <Stack.Screen name={"MyFavoriteScreen"} component={MyFavoriteScreen} />
      <Stack.Screen
        name={"OrganizationChoiceScreen"}
        component={OrganizationChoiceScreen}
      />
      <Stack.Screen
        name={"OrganizationManageScreen"}
        component={OrganizationManageScreen}
      />
    </Stack.Navigator>
  );
}
