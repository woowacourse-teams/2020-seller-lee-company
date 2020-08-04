/**
 * @author kouz95
 */

import React, { useLayoutEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";

import { HeaderBackButton, StackNavigationProp } from "@react-navigation/stack";
import SelectBuyerArticleInfo from "../components/SelectBuyer/SelectBuyerArticleInfo";
import { chatRoomAPI } from "../api/api";
import BuyerCard from "../components/SelectBuyer/BuyerCard";
import { Buyer } from "../types/types";
import { EvilIcons } from "@expo/vector-icons";

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
    navigation.setOptions({
      title: "구매자 선택",
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
    const loadBuyers = async (articleId: number) => {
      const { data } = await chatRoomAPI.getBuyers(articleId);
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
        {buyers.map((buyer, index) => (
          <BuyerCard
            key={index}
            avatar={buyer.avatar}
            nickname={buyer.nickname}
          />
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
    backgroundColor: "rgba(255,255,255,0.5)",
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    borderTopColor: "lightgrey",
    borderBottomColor: "lightgrey",
    borderTopWidth: 0.7,
    borderBottomWidth: 0.7,
  },
  buyerListContainer: {
    flex: 5,
  },
});
