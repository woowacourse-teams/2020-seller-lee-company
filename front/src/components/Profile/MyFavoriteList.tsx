import React, { useEffect } from "react";
import MyFavoriteItem from "./MyFavoriteItem";
import { FlatList, StyleSheet, View } from "react-native";
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
      <FlatList
        data={articles}
        keyExtractor={(item, index) => `${index}`}
        renderItem={({ item }) => <MyFavoriteItem article={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 15,
  },
});
