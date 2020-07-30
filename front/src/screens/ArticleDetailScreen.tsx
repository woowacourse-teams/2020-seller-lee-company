/**
 * @author joseph415
 */

import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import DetailArticle from "../components/DetailArticle";
import ArticleDetailFavorite from "../components/ArticleDetailFavorite";
import ArticlePriceAndTradeType from "../components/ArticlePriceAndTradeType";
import ChatButton from "../components/ChatButton";
import ArticleDetailImageSlider from "../components/ArticleDetailImageSlider";

export interface ArticleDetailProp {
  article_id: number;
}

export default function ArticleDetailScreen({ article_id }: ArticleDetailProp) {
  const getMockImages = () => {
    return [
      require("../../assets/favicon.png"),
      require("../../assets/icon.png"),
      require("../../assets/splash.png"),
    ];
  };

  return (
    <View style={styles.ArticleDetailContainer}>
      <ScrollView
        style={styles.ScrollViewContainer}
        bounces={false}
        contentContainerStyle={styles.container}
      >
        <View style={styles.image}>
          <ArticleDetailImageSlider images={getMockImages()} />
        </View>
        <View style={styles.member}>
          <Text>.</Text>
        </View>
        <View style={styles.article}>
          <DetailArticle />
        </View>
      </ScrollView>
      <View style={styles.bottomTab}>
        <ArticleDetailFavorite article_id={article_id} />
        <ArticlePriceAndTradeType article_id={article_id} />
        <View style={styles.chatButtonContainer}>
          <ChatButton />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  ArticleDetailContainer: {
    flex: 1,
  },
  ScrollViewContainer: {
    height: "75%",
  },
  container: {
    flex: 1,
  },
  image: {
    flex: 5,
    backgroundColor: "lightblue",
  },
  member: {
    flex: 1,
    backgroundColor: "lightyellow",
  },
  article: {
    flex: 4,
    backgroundColor: "white",
  },
  bottomTab: {
    flexDirection: "row",
    flex: 1,
    marginHorizontal: 15,
  },
  chatButtonContainer: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center",
  },
});
