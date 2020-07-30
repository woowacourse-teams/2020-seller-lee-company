/**
 * @author joseph415
 */

import React, { useEffect, useLayoutEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import { Feed, FeedParamList } from "../types/types";
import { StackNavigationProp } from "@react-navigation/stack";
import FeedArticleCard from "../components/FeedArticleCard";

type FeedHomeNavigationProp = StackNavigationProp<FeedParamList, "FeedHome">;

export default function FeedHomeScreen() {
  const navigation = useNavigation<FeedHomeNavigationProp>();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [articles, setArticles] = useState<Feed[]>([]);

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
      renderItem={({ item }) => (
        <FeedArticleCard
          article_id={item.article_id}
          price={item.price}
          tagBoxes={item.tagBoxes}
          favorite={item.favorite}
          photos={item.photos}
        />
      )}
      keyExtractor={(item) => `${item.article_id}`}
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
