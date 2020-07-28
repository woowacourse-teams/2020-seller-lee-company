/**
 * @author begaonnuri
 */

import React, { useLayoutEffect, useState } from "react";
import { ActivityIndicator, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { mockFeedArticles } from "../data/feedArticleMockData";
import FeedArticleCard from "../components/FeedArticleCard";

export default function FeedHomeScreen() {
  const navigation = useNavigation();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

  const getInitData = () => {
    // fetch init data
  };

  const onRefresh = async () => {
    setIsRefreshing(true);
    await getInitData();
    setIsRefreshing(false);
  };

  const getMoreData = () => {
    // fetch more data
  };

  const onLoad = async () => {
    setIsLoading(true);
    await getMoreData();
    setIsLoading(false);
  };

  return (
    <FlatList
      data={mockFeedArticles}
      renderItem={({ item }) => <FeedArticleCard feedArticle={item} />}
      keyExtractor={(item) => `${item.id}`}
      refreshing={isRefreshing}
      onRefresh={onRefresh}
      onEndReachedThreshold={0}
      onEndReached={onLoad}
      ListFooterComponent={isLoading ? <ActivityIndicator /> : <></>}
    />
  );
}
