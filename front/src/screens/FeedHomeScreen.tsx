/**
 * @author begaonnuri
 */

import React, { useEffect, useLayoutEffect, useState } from "react";
import { ActivityIndicator, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import DemoArticle from "../components/DemoArticle";
import axios from "axios";
import { Article, FeedHomeNavigationProp } from "../types/types";

export default function FeedHomeScreen() {
  const BASE_URL = "http://localhost:8080/";
  const MIN_LOAD_ARTICLE_COUNT = 3;
  const PAGE_ARTICLE_UNIT = 10;

  const navigation = useNavigation<FeedHomeNavigationProp>();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [articles, setArticles] = useState<Article[]>([]);

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
    const { data } = await axios.get(`${BASE_URL}/articles`, {
      params: {
        lastArticleId: Number.MAX_SAFE_INTEGER,
        size: PAGE_ARTICLE_UNIT,
      },
    });
    setArticles([...data]);
  };

  const loadFeed = async () => {
    const { data } = await axios.get(`${BASE_URL}/articles`, {
      params: {
        lastArticleId: getLastArticleId(),
        size: PAGE_ARTICLE_UNIT,
      },
    });
    setArticles(articles.concat(data));
  };

  const getLastArticleId = () => {
    return articles
      .map((article) => article.id)
      .sort((a, b) => b - a)
      .pop();
  };

  const onRefresh = async () => {
    setIsRefreshing(true);
    await initFeed();
    setIsRefreshing(false);
  };

  const onLoad = async () => {
    if (articles.length < MIN_LOAD_ARTICLE_COUNT) return;
    setIsLoading(true);
    await loadFeed();
    setIsLoading(false);
  };

  return (
    <FlatList
      data={articles}
      renderItem={({ item }) => <DemoArticle item={item} />}
      keyExtractor={(item, index) => `${index}`}
      refreshing={isRefreshing}
      onRefresh={onRefresh}
      onEndReachedThreshold={0.25}
      onEndReached={onLoad}
      ListFooterComponent={isLoading ? <ActivityIndicator /> : <></>}
    />
  );
}
