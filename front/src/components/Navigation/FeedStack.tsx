import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { FeedStackParams } from "../../types/types";
import ArticleDetailScreen from "../../screens/ArticleDetailScreen";
import ArticleDetailPhotoViewScreen from "../../screens/ArticleDetailPhotoViewScreen";
import ArticleContentsFormScreen from "../../screens/ArticleContentsFormScreen";
import CategoryChoiceScreen from "../../screens/CategoryChoiceScreen";
import BottomTabs from "./BottomTabs";
import ArticleFormScreen from "../../screens/ArticleFormScreen";

const Stack = createStackNavigator<FeedStackParams>();

export default function FeedStack() {
  return (
    <Stack.Navigator headerMode={"screen"}>
      <Stack.Screen
        name={"FeedHomeScreen"}
        component={BottomTabs}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={"ArticleDetailScreen"}
        component={ArticleDetailScreen}
      />
      <Stack.Screen
        name={"ArticleDetailPhotoViewScreen"}
        component={ArticleDetailPhotoViewScreen}
      />
      <Stack.Screen
        name={"ArticleContentsFormScreen"}
        component={ArticleContentsFormScreen}
      />
      <Stack.Screen
        name={"CategoryChoiceScreen"}
        component={CategoryChoiceScreen}
      />
      <Stack.Screen name={"ArticleFormScreen"} component={ArticleFormScreen} />
    </Stack.Navigator>
  );
}
