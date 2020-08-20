import * as React from "react";
import { useEffect, useLayoutEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import { useNavigation } from "@react-navigation/native";
import { HeaderBackButton } from "@react-navigation/stack";
import { EvilIcons } from "@expo/vector-icons";
import OnSaleTab from "../components/Profile/OnSaleTab";
import CompletedTab from "../components/Profile/CompletedTab";
import { useSetRecoilState } from "recoil/dist";
import { articleSalesHistoryState } from "../states/articleState";
import { articlesAPI } from "../api/api";
import { SalesHistoryScreenNavigationProp } from "../types/types";

export const ON_SALE = "ON_SALE";
export const RESERVATION = "RESERVATION";
export const COMPLETED = "COMPLETED";

export default function SalesHistoryScreen() {
  const salesHistoryTabs = [
    { key: "onSale", title: "판매중" },
    { key: "completed", title: "판매 완료" },
  ];
  const ON_SALE_INDEX = 0;
  const COMPLETED_INDEX = 1;

  const navigation = useNavigation<SalesHistoryScreenNavigationProp>();
  const [index, setIndex] = useState(0);
  const [routes] = useState(salesHistoryTabs);
  const setSalesHistoryArticles = useSetRecoilState(articleSalesHistoryState);

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

  useEffect(() => {
    getArticles(ON_SALE);
  }, []);

  const renderScene = SceneMap({
    onSale: OnSaleTab,
    completed: CompletedTab,
  });

  const onTabChange = async (idx: number) => {
    setIndex(idx);
    if (idx === ON_SALE_INDEX) {
      await getArticles(ON_SALE);
    }
    if (idx === COMPLETED_INDEX) {
      await getArticles(COMPLETED);
    }
  };

  const getArticles = async (tradeState: string) => {
    const { data } = await articlesAPI.getByTradeState({ tradeState });
    setSalesHistoryArticles(data);
  };

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={onTabChange}
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
