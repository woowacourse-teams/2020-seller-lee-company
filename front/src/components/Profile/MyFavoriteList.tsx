import React, { useEffect } from "react";
import MyFavoriteItem from "./MyFavoriteItem";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useRecoilState } from "recoil/dist";
import { favoriteArticleState } from "../../states/articleState";
import { articlesAPI } from "../../api/api";

export default function MyFavoriteList() {
  const [articles, setArticles] = useRecoilState(favoriteArticleState);

  useEffect(() => {
    getFavoriteArticles();
  }, []);

  const getFavoriteArticles = async () => {
    const { data } = await articlesAPI.getFavorites();
    setArticles(data);
  };

  return (
    <View style={styles.container}>
      {articles.length !== 0 ? (
        <FlatList
          data={articles}
          keyExtractor={(item, index) => `${index}`}
          renderItem={({ item }) => <MyFavoriteItem article={item} />}
        />
      ) : (
        <Text style={styles.text}>찜 목록이 비어있어요.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 15,
  },
  text: {
    paddingTop: 30,
    textAlign: "center",
    color: "#777",
  },
});
