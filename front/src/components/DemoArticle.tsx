/**
 * @author begaonnuri
 */

import React from "react";
import { Text } from "react-native";

interface DemoArticleType {
  title: string;
}

export default function DemoArticle({ title }: DemoArticleType) {
  return <Text>{title}</Text>;
}
