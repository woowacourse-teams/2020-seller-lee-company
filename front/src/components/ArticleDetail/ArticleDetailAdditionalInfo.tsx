import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useRecoilValue } from "recoil";
import { articleSelectedState } from "../../states/articleState";
import FeedArticleTag from "../Feed/FeedArticleTag";
import ArticleDetailTradeState from "./ArticleDetailTradeState";

export default function ArticleDetailAdditionalInfo() {
  const article = useRecoilValue(articleSelectedState);

  return (
    <View style={styles.container}>
      <View style={styles.titleAndTag}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{article.title}</Text>
        </View>
        <View style={styles.tagContainer}>
          {article.tags.map((tag, index) => (
            <FeedArticleTag key={index} tag={tag} />
          ))}
        </View>
      </View>
      <View style={styles.tradeState}>
        <ArticleDetailTradeState />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  titleAndTag: {
    flex: 4,
    flexWrap: "wrap",
  },
  titleContainer: {
    marginBottom: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
  },
  tagContainer: {
    flexDirection: "row",
  },
  tradeState: {
    flex: 1,
    justifyContent: "center",
    marginVertical: 5,
  },
});
