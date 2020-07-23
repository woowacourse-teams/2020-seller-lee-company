/**
 * @author begaonnuri
 */

import React from "react";
import { Text } from "react-native";

interface DemoArticleProps {
  title: string;
}

export default function DemoArticle({ title }: DemoArticleProps) {
  return <Text>{title}</Text>;
}
