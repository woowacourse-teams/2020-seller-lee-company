import * as React from "react";
import { useEffect, useLayoutEffect, useState } from "react";
import { StyleSheet, Text } from "react-native";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { HeaderBackButton, StackNavigationProp } from "@react-navigation/stack";
import { Feather } from "@expo/vector-icons";
import OnSaleTab from "../components/Profile/OnSaleTab";
import CompletedTab from "../components/Profile/CompletedTab";
import { useSetRecoilState } from "recoil/dist";
import { articleSalesHistoryState } from "../states/articleState";
import { articlesAPI } from "../api/api";
import { HomeStackParam, RootStackParam } from "../types/types";
import theme from "../colors";
import { Scene } from "react-native-tab-view/lib/typescript/src/types";

export const ON_SALE = "ON_SALE";
export const RESERVATION = "RESERVATION";
export const COMPLETED = "COMPLETED";

type SalesHistoryScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<HomeStackParam, "SalesHistoryScreen">,
  StackNavigationProp<RootStackParam, "HomeStack">
>;

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
      headerTitleAlign: "left",
      headerLeft: () => (
        <HeaderBackButton
          labelVisible={false}
          onPress={navigation.goBack}
          backImage={() => (
            <Feather name="chevron-left" size={24} color="black" />
          )}
        />
      ),
      headerLeftContainerStyle: {
        alignItems: "center",
        justifyContents: "center",
        aspectRatio: 1,
      },
    });
  }, [navigation]);

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

  const dynamicTextColor = (focused: boolean) => {
    return focused ? "black" : "grey";
  };

  const renderLabel = (
    scene: Scene<{ key: string; title: string }> & {
      focused: boolean;
      color: string;
    },
  ) => {
    const tabLabel = salesHistoryTabs.filter(
      (value) => value.key === scene.route.key,
    )[0].title;

    return (
      <Text style={{ color: dynamicTextColor(scene.focused) }}>{tabLabel}</Text>
    );
  };

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={onTabChange}
      style={styles.container}
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
  );
}

const styles = StyleSheet.create({
  container: {
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
