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
    getData();
  }, []);

  const getData = async () => {
    const { data } = await axios.get("http://localhost:8080/articles");
    setArticles(data);
  };

  const onRefresh = async () => {
    setIsRefreshing(true);
    await getData();
    setIsRefreshing(false);
  };

  const onLoad = async () => {
    if (articles.length < 3) return;
    setIsLoading(true);
    await getData();
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
