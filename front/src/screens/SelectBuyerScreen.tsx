/**
 * @author kouz95
 */

import React, { useLayoutEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";

import { StackNavigationProp } from "@react-navigation/stack";
import SelectBuyerArticleInfo from "../components/SelectBuyer/SelectBuyerArticleInfo";
import { chattingAPI } from "../api/api";
import BuyerCard from "../components/SelectBuyer/BuyerCard";
import { Buyer } from "../types/types";

type SampleNavigationParamList = {
  SelectBuyerScreen: {
    articleId: number;
    title: string;
    photo: string;
  };
};

type SelectBuyerScreenRouteProp = RouteProp<
  SampleNavigationParamList,
  "SelectBuyerScreen"
>;

export default function SelectBuyerScreen() {
  const navigation = useNavigation<
    StackNavigationProp<SampleNavigationParamList, "SelectBuyerScreen">
  >();
  const route = useRoute<SelectBuyerScreenRouteProp>();
  const [buyers, setBuyers] = useState<Buyer[]>([]);

  useLayoutEffect(() => {
    const loadBuyers = async (articleId: number) => {
      const { data } = await chattingAPI.getBuyers(articleId);
      setBuyers(data);
    };
    loadBuyers(route.params.articleId);
  }, [navigation, route]);

  return (
    <View style={styles.container}>
      <View style={styles.articleInfoContainer}>
        <SelectBuyerArticleInfo
          title={route.params.title}
          photo={route.params.photo}
        />
      </View>
      <View style={styles.buyerListContainer}>
        {buyers.map((buyer) => (
          <BuyerCard avatar={buyer.avatar} nickname={buyer.nickname} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  articleInfoContainer: {
    flex: 1,
    flexDirection: "row",
  },
  buyerListContainer: {
    flex: 1,
  },
});
