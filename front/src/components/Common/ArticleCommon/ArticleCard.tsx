import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import {
  ArticleCardProps,
  CategoryHomeNavigationProp,
} from "../../../types/types";
import ArticleCardImage from "./ArticleCardImage";
import ArticleCardTitle from "./ArticleCardTitle";
import ArticleCardTradeDetails from "./ArticleCardTradeDetails";
import ArticleCardAdditional from "./ArticleCardAdditional";
import { useNavigation } from "@react-navigation/native";
import { useSetRecoilState } from "recoil/dist";
import { articleSelectedIdState } from "../../../states/articleState";
import ArticleCardTradeState from "./ArticleCardTradeState";

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
  const navigation = useNavigation<CategoryHomeNavigationProp>();
  const setArticleSelectedId = useSetRecoilState(articleSelectedIdState);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        setArticleSelectedId(id);
        navigation.navigate("ArticleDetailScreen");
      }}
    >
      <View style={styles.innerContainer}>
        <View style={styles.articleCardImageContainer}>
          <ArticleCardImage thumbnail={thumbnail} />
        </View>
        <View style={styles.contentsContainer}>
          <ArticleCardTitle title={title} />
          <ArticleCardTradeState tradeState={tradeState} />
          <ArticleCardTradeDetails createdTime={createdTime} />
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
    margin: 1,
  },
  innerContainer: {
    borderRadius: 5,
    flexDirection: "row",
    aspectRatio: 13 / 4,
    justifyContent: "center",
    backgroundColor: "white",
  },
  contentsContainer: {
    flex: 1,
    margin: 13,
  },
  articleCardImageContainer: {
    aspectRatio: 1,
    justifyContent: "center",
  },
});
