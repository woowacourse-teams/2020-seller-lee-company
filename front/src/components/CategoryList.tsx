/**
 * @author begaonnuri
 */

import React from "react";
import { FlatList } from "react-native";
import CategoryItem from "./CategoryItem";
import { mockCategories } from "../data/categoryMockData";

export default function CategoryList() {
  return (
    <FlatList
      data={mockCategories}
      renderItem={({ item }) => <CategoryItem title={item.title} />}
      keyExtractor={(item) => item.id}
    />
  );
}
