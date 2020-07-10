import React from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import ArticleCard from "./src/components/ArticleCard";
import { mockArticles } from "./src/data/articleMockData";
import index from "./src/styles";

export default function App() {
  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={index.header} />
      <View style={index.contents}>
        <View style={styles.container}>
          {mockArticles.map((mockArticle) => {
            return (
              <ArticleCard
                key={Math.random()}
                title={mockArticle.title}
                price={mockArticle.price}
                createdAt={mockArticle.createdAt}
                detail={mockArticle.detail}
                additional={mockArticle.additional}
                thumbnail={mockArticle.thumbnail}
              />
            );
          })}
        </View>
      </View>
      <View style={index.footer} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
