/**
 * @author begaonnuri
 */

import React from "react";
import { StyleSheet, Text } from "react-native";
import { Article } from "../types/types";

interface DemoArticleProps {
  item: Article;
}

export default function DemoArticle({ item }: DemoArticleProps) {
  return (
    <>
      <Text style={styles.text}>id : {item.id}</Text>
      <Text style={styles.text}>authorId : {item.authorId}</Text>
      <Text style={styles.text}>title : {item.title}</Text>
      <Text style={styles.text}>category : {item.category}</Text>
      <Text style={styles.text}>price : {item.price}</Text>
      <Text style={styles.text}>contents : {item.contents}</Text>
      {item.tags.map((tag) => (
        <Text style={styles.text}>{tag.name}</Text>
      ))}
    </>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
  },
});
