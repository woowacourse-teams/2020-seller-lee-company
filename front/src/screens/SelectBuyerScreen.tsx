import React, { useLayoutEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { HeaderBackButton, StackNavigationProp } from "@react-navigation/stack";
import SelectBuyerArticleInfo from "../components/SelectBuyer/SelectBuyerArticleInfo";
import { chatRoomAPI } from "../api/api";
import BuyerCard from "../components/SelectBuyer/BuyerCard";
import { Buyer, HomeStackParam, RootStackParam } from "../types/types";
import { Feather } from "@expo/vector-icons";
import { useRecoilValue } from "recoil";
import {
  articleIdState,
  articlePhotosState,
  articleTitleState,
} from "../states/articleState";

type SelectBuyerScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<HomeStackParam, "SelectBuyerScreen">,
  StackNavigationProp<RootStackParam, "HomeStack">
>;

export default function SelectBuyerScreen() {
  const navigation = useNavigation<SelectBuyerScreenNavigationProp>();
  const [buyers, setBuyers] = useState<Buyer[]>([]);
  const articleId = useRecoilValue(articleIdState);
  const title = useRecoilValue(articleTitleState);
  const photo = useRecoilValue(articlePhotosState)[0];

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "구매자 선택",
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

    const loadBuyers = async (selectedArticleId: number) => {
      const { data } = await chatRoomAPI.getBuyers(selectedArticleId);
      setBuyers(data);
    };
    loadBuyers(articleId);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.articleInfoContainer}>
        <SelectBuyerArticleInfo title={title} photo={photo} />
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
