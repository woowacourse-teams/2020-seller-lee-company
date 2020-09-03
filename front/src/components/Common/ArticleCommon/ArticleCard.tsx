import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import {
  ArticleCardProps,
  HomeStackParam,
  RootStackParam,
} from "../../../types/types";
import ArticleCardImage from "./ArticleCardImage";
import ArticleCardTitle from "./ArticleCardTitle";
import ArticleCardTradeDetails from "./ArticleCardTradeDetails";
import ArticleCardAdditional from "./ArticleCardAdditional";
import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { useSetRecoilState } from "recoil/dist";
import { articleSelectedIdState } from "../../../states/articleState";
import ArticleCardTradeState from "./ArticleCardTradeState";
import { StackNavigationProp } from "@react-navigation/stack";

type ArticleCardNavigationProp = CompositeNavigationProp<
  StackNavigationProp<HomeStackParam, "CategoryHomeScreen">,
  StackNavigationProp<RootStackParam, "HomeStack">
>;

export default function ArticleCard({
  id,
  title,
  price,
  createdTime,
  tradeState,
  favoriteState,
  favoriteCount,
  thumbnail,
}: ArticleCardProps) {
  const navigation = useNavigation<ArticleCardNavigationProp>();
  const setArticleSelectedId = useSetRecoilState(articleSelectedIdState);

  const onPressCard = () => {
    setArticleSelectedId(id);
    navigation.navigate("ArticleDetailScreen");
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPressCard}>
      <View style={styles.innerContainer}>
        <View style={styles.articleCardImageContainer}>
          <ArticleCardImage thumbnail={thumbnail} />
        </View>
        <View style={styles.contentsContainer}>
          <ArticleCardTitle title={title} />
          <View style={styles.tradeStateAndDetailContainer}>
            <ArticleCardTradeState tradeState={tradeState} />
            <View style={styles.detailContainer}>
              <ArticleCardTradeDetails createdTime={createdTime} />
            </View>
          </View>
          <ArticleCardAdditional
            price={price}
            favoriteCount={favoriteCount}
            favoriteState={favoriteState}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    aspectRatio: 3.5,
  },
  innerContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  articleCardImageContainer: {
    aspectRatio: 1,
    justifyContent: "center",
  },
  tradeStateAndDetailContainer: {
    aspectRatio: 10,
    flexDirection: "row",
  },
  detailContainer: {
    flex: 1,
  },
  contentsContainer: {
    flex: 1,
    marginLeft: 15,
  },
});
