/**
 * @author begaonnuri
 */

import React from "react";
import { FlatList } from "react-native";
import CategoryItem from "./CategoryItem";
import { CategoryChoiceProps } from "../types";
import { mockCategories } from "../data/categoryMockData";

export default function CategoryList({
  onSelectCategory,
}: CategoryChoiceProps) {
  return (
    <FlatList
      data={mockCategories}
      renderItem={({ item }) => (
        <CategoryItem title={item.title} onSelectCategory={onSelectCategory} />
      )}
      keyExtractor={(item) => item.id}
    />
  );
}
