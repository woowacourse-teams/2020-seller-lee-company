import React, { useEffect, useLayoutEffect } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { HeaderBackButton, StackNavigationProp } from "@react-navigation/stack";
import { Feather } from "@expo/vector-icons";
import PurchaseHistoryItem from "../components/Profile/PurchaseHistoryItem";
import { tradeAPI } from "../api/api";
import { useRecoilState } from "recoil/dist";
import { tradeArticleState } from "../states/articleState";
import { HomeStackParam, RootStackParam } from "../types/types";

type PurchaseHistoryScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<HomeStackParam, "PurchaseHistoryScreen">,
  StackNavigationProp<RootStackParam, "HomeStack">
>;

export default function PurchaseHistoryScreen() {
  const navigation = useNavigation<PurchaseHistoryScreenNavigationProp>();
  const [tradeArticles, setTradeArticles] = useRecoilState(tradeArticleState);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "구매 내역",
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
    getArticles();
  }, []);

  const getArticles = async () => {
    try {
      const { data } = await tradeAPI.get();
      setTradeArticles(data);
    } catch (error) {
      console.log("tradeArticle error");
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={tradeArticles}
        renderItem={({ item }) => <PurchaseHistoryItem article={item} />}
        keyExtractor={(item, index) => `${index}`}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
