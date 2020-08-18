import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MyPage from "../../screens/MyPage";
import SalesDetailsScreen from "../../screens/SalesDetailsScreen";
import { MyPageParamList } from "../../types/types";
import ArticleDetailScreen from "../../screens/ArticleDetailScreen";
import EvaluationScreen from "../../screens/EvaluationScreen";

const Stack = createStackNavigator<MyPageParamList>();

export default function MyPageNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="MyPage" component={MyPage} />
      <Stack.Screen name="SalesDetails" component={SalesDetailsScreen} />
      <Stack.Screen
        name="ArticleDetailScreen"
        component={ArticleDetailScreen}
      />
      <Stack.Screen name={"Evaluation"} component={EvaluationScreen} />
    </Stack.Navigator>
  );
}
