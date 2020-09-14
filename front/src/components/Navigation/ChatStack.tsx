import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { ChatStackParam } from "../../types/types";
import ChatRoomListScreen from "../../screens/ChatRoomListScreen";
import ChatScreen from "../../screens/ChatScreen";
import WholeChatScreen from "../../screens/WholeChatScreen";

const Stack = createStackNavigator<ChatStackParam>();

export default function ChatStack() {
  return (
    <Stack.Navigator
      initialRouteName={"ChatRoomListScreen"}
      headerMode={"screen"}
    >
      <Stack.Screen
        name={"ChatRoomListScreen"}
        component={ChatRoomListScreen}
      />
      <Stack.Screen name={"ChatScreen"} component={ChatScreen} />
      <Stack.Screen name={"WholeChatScreen"} component={WholeChatScreen} />
    </Stack.Navigator>
  );
}
