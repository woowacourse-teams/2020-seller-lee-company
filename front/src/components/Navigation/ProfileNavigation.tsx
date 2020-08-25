import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SalesHistoryScreen from "../../screens/SalesHistoryScreen";
import ProfileScreen from "../../screens/ProfileScreen";
import { ProfileNavigationParamList } from "../../types/types";
import PurchaseHistoryScreen from "../../screens/PurchaseHistoryScreen";
import EvaluationScreen from "../../screens/EvaluationScreen";
import SelectBuyerScreen from "../../screens/SelectBuyerScreen";
import ArticleDetailScreen from "../../screens/ArticleDetailScreen";
import ArticleDetailImageViewScreen from "../../screens/ArticleDetailImageViewScreen";
import ArticleFormScreen from "../../screens/ArticleFormScreen";
import MyInfoScreen from "../../screens/MyInfoScreen";

const Stack = createStackNavigator<ProfileNavigationParamList>();

export default function ProfileNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="SalesHistoryScreen" component={SalesHistoryScreen} />
      <Stack.Screen
        name="PurchaseHistoryScreen"
        component={PurchaseHistoryScreen}
      />
      <Stack.Screen
        name="ArticleDetailScreen"
        component={ArticleDetailScreen}
      />
      <Stack.Screen name="ArticleFormScreen" component={ArticleFormScreen} />
      <Stack.Screen
        name="ArticleDetailImageViewScreen"
        component={ArticleDetailImageViewScreen}
      />
      <Stack.Screen name="SelectBuyerScreen" component={SelectBuyerScreen} />
      <Stack.Screen name="EvaluationScreen" component={EvaluationScreen} />
      <Stack.Screen name="MyInfoScreen" component={MyInfoScreen} />
    </Stack.Navigator>
  );
}
