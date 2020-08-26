import React, { useEffect, useLayoutEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet } from "react-native";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { ArticleCardProps, CategoryHomeNavigationProp } from "../types/types";
import { articlesAPI } from "../api/api";
import {
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
} from "recoil/dist";
import {
  articleIsModifiedState,
  articleSelectedCategoryState,
} from "../states/articleState";
import ArticleCard from "../components/Common/ArticleCommon/ArticleCard";
import { HeaderBackButton } from "@react-navigation/stack";
import { EvilIcons } from "@expo/vector-icons";

export default function CategoryHomeScreen() {
  const MIN_LOAD_ARTICLE_COUNT = 3;
  const PAGE_ARTICLE_UNIT = 10;

  const navigation = useNavigation<CategoryHomeNavigationProp>();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [articles, setArticles] = useState<ArticleCardProps[]>([]);
  const [hasAdditionalArticle, setHasAdditionalArticle] = useState(true);
  const category = useRecoilValue(articleSelectedCategoryState);
  const resetCategory = useResetRecoilState(articleSelectedCategoryState);
  const isFocused = useIsFocused();
  const [isModified, setIsModified] = useRecoilState(articleIsModifiedState);

  useEffect(() => {
    const applyChange = async () => {
      initFeed();
      setIsModified(false);
    };
    isModified ? applyChange() : undefined;
  }, [isFocused]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: category,
      headerRight: () => <></>,
      headerRightContainerStyle: { paddingRight: 15 },
      headerLeft: () => {
        resetCategory();
        return (
          <HeaderBackButton
            labelVisible={false}
            onPress={navigation.goBack}
            backImage={() => (
              <EvilIcons name="chevron-left" size={24} color="black" />
            )}
          />
        );
      },
      headerLeftContainerStyle: { paddingLeft: 15 },
    });
  }, [navigation]);

  useEffect(() => {
    initFeed();
  }, []);

  const initFeed = async () => {
    const { data } = await articlesAPI.getByCategory({
      lastArticleId: Number.MAX_SAFE_INTEGER,
      size: PAGE_ARTICLE_UNIT,
      category,
    });
    setArticles([...data]);
  };

  const loadFeed = async () => {
    const { data } = await articlesAPI.getByCategory({
      lastArticleId: getLastArticleId(),
      size: PAGE_ARTICLE_UNIT,
      category,
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
    if (!category) {
      setIsLoading(false);
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
        <ArticleCard
          id={item.id}
          title={item.title}
          price={item.price}
          tradeState={item.tradeState}
          favoriteState={item.favoriteState}
          favoriteCount={item.favoriteCount}
          thumbnail={item.thumbnail}
          createdTime={item.createdTime}
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
