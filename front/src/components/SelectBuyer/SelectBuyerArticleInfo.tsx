/**
 * @author kouz95
 */

import React from "react";
import { Image, StyleSheet, Text } from "react-native";

interface SelectBuyerArticleInfoProps {
  title: string;
  photo: string;
}

export default function SelectBuyerArticleInfo({
  title,
  photo,
}: SelectBuyerArticleInfoProps) {
  return (
    <>
      <Text style={styles.title}>{title}</Text>
      <Image style={styles.image} source={{ uri: photo }} />
    </>
  );
}

const styles = StyleSheet.create({
  title: {},
  image: {
    flex: 1,
  },
});
