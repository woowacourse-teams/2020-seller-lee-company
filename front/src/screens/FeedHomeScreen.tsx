import React, { useEffect, useLayoutEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { Feed, FeedHomeNavigationProp } from "../types/types";
import FeedArticleCard from "../components/Feed/FeedArticleCard";
import { articlesAPI } from "../api/api";

export default function FeedHomeScreen() {
  const MIN_LOAD_ARTICLE_COUNT = 3;
  const PAGE_ARTICLE_UNIT = 10;

  const navigation = useNavigation<FeedHomeNavigationProp>();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [articles, setArticles] = useState<Feed[]>([]);
  const [hasAdditionalArticle, setHasAdditionalArticle] = useState(true);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "",
      headerRight: () => (
        <MaterialIcons
          name="person"
          size={24}
          color="black"
          onPress={() => navigation.navigate("SellerLee")}
        />
      ),
      headerRightContainerStyle: { paddingRight: 15 },
    });
  }, [navigation]);

  useEffect(() => {
    initFeed();
  }, []);

  const initFeed = async () => {
    const { data } = await articlesAPI.get({
      lastArticleId: Number.MAX_SAFE_INTEGER,
      size: PAGE_ARTICLE_UNIT,
    });
    setArticles([...data]);
  };

  const loadFeed = async () => {
    const { data } = await articlesAPI.get({
      lastArticleId: getLastArticleId(),
      size: PAGE_ARTICLE_UNIT,
    });
    setArticles(articles.concat(data));
    return data;
  };

  const getLastArticleId = () => {
    return articles
      .map((article) => article.id)
      .sort((a, b) => b - a)
      .pop() as number;
  };

  const onRefresh = async () => {
    setIsRefreshing(true);
    await initFeed();
    setHasAdditionalArticle(true);
    setIsRefreshing(false);
  };

  const onLoad = async () => {
    if (articles.length < MIN_LOAD_ARTICLE_COUNT || !hasAdditionalArticle) {
      return;
    }
    setIsLoading(true);
    const data = await loadFeed();
    if (data.length === 0) {
      setHasAdditionalArticle(false);
    }
    setIsLoading(false);
  };

  return (
    <FlatList
      data={articles}
      renderItem={({ item }) => (
        <FeedArticleCard
          id={item.id}
          price={item.price}
          tags={item.tags}
          favoriteCount={item.favoriteCount}
          photos={item.photos}
          favoriteState={item.favoriteState}
        />
      )}
      keyExtractor={(item) => `${item.id}`}
      refreshing={isRefreshing}
      contentContainerStyle={styles.feedArticleContainer}
      onRefresh={onRefresh}
      onEndReachedThreshold={0.25}
      onEndReached={onLoad}
      ListFooterComponent={isLoading ? <ActivityIndicator /> : <></>}
    />
  );
}

const styles = StyleSheet.create({
  feedArticleContainer: {
    marginHorizontal: 3,
  },
});
