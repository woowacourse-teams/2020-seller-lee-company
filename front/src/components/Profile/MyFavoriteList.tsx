import React, { useEffect } from "react";
import MyFavoriteItem from "./MyFavoriteItem";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useRecoilState } from "recoil/dist";
import { favoriteArticleState } from "../../states/articleState";
import { favoriteAPI } from "../../api/api";
import theme from "../../colors";

export default function MyFavoriteList() {
  const [articles, setArticles] = useRecoilState(favoriteArticleState);

  useEffect(() => {
    getFavoriteArticles();
  }, []);

  const getFavoriteArticles = async () => {
    const { data } = await favoriteAPI.getFavorites();
    setArticles(data);
  };

  return (
    <View style={styles.container}>
      {articles.length !== 0 ? (
        <FlatList
          data={articles}
          keyExtractor={(item, index) => `${index}`}
          renderItem={({ item }) => (
            <View style={styles.myFavoriteItemContainer}>
              <MyFavoriteItem article={item} />
            </View>
          )}
        />
      ) : (
        <Text style={styles.text}>찜 목록이 비어있어요.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    backgroundColor: "white",
  },
  myFavoriteItemContainer: {
    paddingVertical: 15,
    borderBottomColor: theme.border,
    borderBottomWidth: 1,
  },
  text: {
    marginTop: 20,
    fontSize: 18,
    textAlign: "center",
    color: "#777",
  },
});
