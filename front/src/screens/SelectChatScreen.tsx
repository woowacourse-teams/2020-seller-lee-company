import React, { useState } from "react";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";

import { Scene } from "react-native-tab-view/lib/typescript/src/types";
import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import theme from "../colors";
import ChatRoomList from "../components/Chat/ChatRoomList";
import OrganizationChatList from "../components/Chat/OrganizationChatList";

export default function SelectChatScreen() {
  const selectChatTabs = [
    { key: "ChatRoomList", title: "채팅 목록" },
    { key: "WholeChat", title: "전체 채팅" },
  ];

  const [index, setIndex] = useState(0);
  const [routes] = useState(selectChatTabs);

  const renderScene = SceneMap({
    ChatRoomList: ChatRoomList,
    WholeChat: OrganizationChatList,
  });

  const onTabChange = (idx: number) => {
    setIndex(idx);
  };

  const dynamicTextColor = (focused: boolean) => {
    return focused ? "black" : "grey";
  };

  const renderLabel = (
    scene: Scene<{ key: string; title: string }> & {
      focused: boolean;
      color: string;
    },
  ) => {
    const tabLabel = selectChatTabs.filter(
      (value) => value.key === scene.route.key,
    )[0].title;

    return (
      <Text style={{ color: dynamicTextColor(scene.focused) }}>{tabLabel}</Text>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Chatting</Text>
      </View>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={onTabChange}
        style={styles.tabViewContainer}
        renderTabBar={(props) => (
          <TabBar
            {...props}
            style={styles.tabBarContainer}
            renderLabel={renderLabel}
            indicatorStyle={styles.indicator}
            indicatorContainerStyle={styles.indicatorContainer}
            activeColor={"black"}
            inactiveColor={"lightgrey"}
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "ios" ? 0 : StatusBar.currentHeight,
  },
  titleContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "white",
    paddingHorizontal: 30,
    borderBottomWidth: 1,
    borderBottomColor: theme.border,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: theme.primary,
  },
  tabViewContainer: {
    flex: 12,
    backgroundColor: "white",
  },
  tabBarContainer: {
    backgroundColor: "white",
    elevation: 0,
  },
  indicator: {
    backgroundColor: theme.secondary,
  },
  indicatorContainer: {
    borderBottomColor: theme.border,
    borderBottomWidth: 1,
  },
});
