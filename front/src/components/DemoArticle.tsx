/**
 * @author begaonnuri
 */

import React from "react";
import { Text } from "react-native";

type DemoArticleType = {
  title: string;
};

export default function DemoArticle({ title }: DemoArticleType) {
  return <Text>{title}</Text>;
}
