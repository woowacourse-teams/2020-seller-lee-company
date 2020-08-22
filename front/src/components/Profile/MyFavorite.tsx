import React, { useEffect } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import MyFavoriteItem from "./MyFavoriteItem";
import { useRecoilState } from "recoil/dist";
import { favoriteArticleState } from "../../states/articleState";

export default function MyFavorite() {
  const [articles, setArticles] = useRecoilState(favoriteArticleState);

  useEffect(() => {
    getFavoriteArticles();
  }, []);

  const getFavoriteArticles = async () => {};

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
    flex: 1,
  },
});
