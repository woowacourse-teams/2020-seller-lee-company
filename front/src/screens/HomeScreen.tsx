/**
 * @author begaonnuri
 */

import React, { useLayoutEffect, useState } from "react";
import { ActivityIndicator, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import DemoArticle from "../components/DemoArticle";
import { mockArticles } from "../data/articleMockData";

export default function HomeScreen() {
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

  const onRefresh = () => {
    setIsRefreshing(true);
    getInitData();
    setIsRefreshing(false);
  };

  const getMoreData = () => {
    // fetch more data
  };

  const onLoad = () => {
    setIsLoading(true);
    getMoreData();
    setIsLoading(false);
  };

  return (
    <FlatList
      data={mockArticles}
      renderItem={({ item }) => <DemoArticle title={item.title} />}
      keyExtractor={(item, index) => `${index}`}
      refreshing={isRefreshing}
      onRefresh={onRefresh}
      onEndReachedThreshold={0}
      onEndReached={onLoad}
      ListFooterComponent={isLoading ? <ActivityIndicator /> : <></>}
    />
  );
}
