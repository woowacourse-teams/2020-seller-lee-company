/**
 * @author joseph415
 */

import React from "react";
import { FlatList } from "react-native";
import { categoryMockArticles } from "../data/categoryArticleMockData";
import CategoryArticleCard from "../components/Category/CategoryArticleCard";

export default function ChatRoomScreen() {
  return (
    <FlatList
      data={categoryMockArticles}
      renderItem={({ item }) => {
        return (
          <CategoryArticleCard
            title={item.title}
            price={item.price}
            createdAt={item.createdAt}
            additional={item.additional}
            thumbnail={item.thumbnail}
          />
        );
      }}
    />
  );
}
