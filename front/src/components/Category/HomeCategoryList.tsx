import React from "react";
import { FlatList } from "react-native";

import { categories } from "../../data/categoryData";
import HomeCategoryItem from "./HomeCategoryItem";

export default function HomeCategoryList() {
  return (
    <FlatList
      data={categories}
      renderItem={({ item }) => <HomeCategoryItem title={item} />}
    />
  );
}
