import React from "react";
import { FlatList } from "react-native";
import CategoryItem from "./CategoryItem";
import { categories } from "../../data/categoryData";

export default function CategoryList() {
  return (
    <FlatList
      data={categories}
      renderItem={({ item }) => <CategoryItem title={item} />}
      keyExtractor={(item, index) => `${index}`}
    />
  );
}
