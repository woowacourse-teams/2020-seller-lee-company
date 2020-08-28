import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { Feed, FeedHomeNavigationProp } from "../types/types";
import FeedArticleCard from "../components/Feed/FeedArticleCard";
import { articlesAPI } from "../api/api";
import { useRecoilState } from "recoil/dist";
import { articleIsModifiedState } from "../states/articleState";
import theme from "../colors";

export default function FeedHomeScreen() {
  const MIN_LOAD_ARTICLE_COUNT = 3;
  const PAGE_ARTICLE_UNIT = 10;

  const navigation = useNavigation<FeedHomeNavigationProp>();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [articles, setArticles] = useState<Feed[]>([]);
  const [hasAdditionalArticle, setHasAdditionalArticle] = useState(true);
  const isFocused = useIsFocused();
  const [isModified, setIsModified] = useRecoilState(articleIsModifiedState);

  const applyChange = async () => {
    initFeed();
    setIsModified(false);
  };

  useEffect(() => {
    applyChange();
  }, [isFocused]);

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
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
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Feeds</Text>
        <Text style={styles.description}>현재 거래 중인 게시글입니다.</Text>
      </View>
      <View style={styles.flatListContainer}>
        <FlatList
          data={articles}
          renderItem={({ item }) => (
            <View style={styles.feedArticleCardContainer}>
              <FeedArticleCard
                id={item.id}
                price={item.price}
                tags={item.tags}
                favoriteCount={item.favoriteCount}
                photos={item.photos}
                favoriteState={item.favoriteState}
              />
            </View>
          )}
          keyExtractor={(item) => `${item.id}`}
          refreshing={isRefreshing}
          contentContainerStyle={styles.feedArticleContainer}
          onRefresh={onRefresh}
          onEndReachedThreshold={0.25}
          onEndReached={onLoad}
          ListFooterComponent={isLoading ? <ActivityIndicator /> : <></>}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "ios" ? 0 : StatusBar.currentHeight,
  },
  titleContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "white",
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: theme.primary,
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    fontWeight: "bold",
    color: theme.secondary,
    marginBottom: 20,
  },
  flatListContainer: {
    flex: 5,
  },
  feedArticleContainer: {
    paddingHorizontal: 20,
  },
  feedArticleCardContainer: {
    backgroundColor: "transparent",
    marginBottom: 10,
  },
});
