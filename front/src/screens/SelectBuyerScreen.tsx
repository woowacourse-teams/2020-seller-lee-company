/**
 * @author kouz95
 */

import React, { useLayoutEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { HeaderBackButton, StackNavigationProp } from "@react-navigation/stack";
import SelectBuyerArticleInfo from "../components/SelectBuyer/SelectBuyerArticleInfo";
import { chatRoomAPI } from "../api/api";
import BuyerCard from "../components/SelectBuyer/BuyerCard";
import { Buyer } from "../types/types";
import { EvilIcons } from "@expo/vector-icons";
import { useRecoilValue } from "recoil";
import {
  articleIdState,
  articlePhotosState,
  articleTitleState,
} from "../states/articleState";

type SampleNavigationParamList = {
  SelectBuyerScreen: {
    articleId: number;
    title: string;
    photo: string;
  };
};

export default function SelectBuyerScreen() {
  const navigation = useNavigation<
    StackNavigationProp<SampleNavigationParamList, "SelectBuyerScreen">
  >();
  const [buyers, setBuyers] = useState<Buyer[]>([]);
  // articleState 사용 (conflict 해결시 반영)
  const articleId = useRecoilValue(articleIdState);
  const title = useRecoilValue(articleTitleState);
  const photo = useRecoilValue(articlePhotosState)[0];

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
    loadBuyers(articleId);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.articleInfoContainer}>
        <SelectBuyerArticleInfo title={title} photo={photo.uri} />
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
