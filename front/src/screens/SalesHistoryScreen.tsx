import * as React from "react";
import { useLayoutEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import { useNavigation } from "@react-navigation/native";
import { HeaderBackButton } from "@react-navigation/stack";
import { EvilIcons } from "@expo/vector-icons";
import OnSaleTab from "../components/Profile/OnSaleTab";
import CompletedTab from "../components/Profile/CompletedTab";

const salesHistoryTabs = [
  { key: "onSale", title: "판매중" },
  { key: "completed", title: "거래완료" },
];

export default function SalesHistoryScreen() {
  const navigation = useNavigation(); // TODO: 타입 지정
  const [index, setIndex] = useState(0);
  const [routes] = useState(salesHistoryTabs);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "판매 내역",
      headerLeft: () => (
        <HeaderBackButton
          labelVisible={false}
          onPress={navigation.goBack}
          backImage={() => (
            <EvilIcons name="chevron-left" size={35} color={"grey"} />
          )}
        />
      ),
      headerLeftContainerStyle: { paddingLeft: 10 },
    });
  }, []);

  const renderScene = SceneMap({
    onSale: OnSaleTab,
    completed: CompletedTab,
  });

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      renderTabBar={(props) => (
        <TabBar
          {...props}
          style={styles.container}
          labelStyle={styles.label}
          indicatorStyle={styles.indicator}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
  label: {
    color: "black",
    fontSize: 15,
  },
  indicator: {
    backgroundColor: "#777",
  },
});
