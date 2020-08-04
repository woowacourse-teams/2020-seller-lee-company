/**
 * @author joseph415
 */

import React from "react";
import { Image, StyleSheet, View } from "react-native";

interface IArticleCardImage {
  thumbnail: string;
}

export default function ArticleCardImage({ thumbnail }: IArticleCardImage) {
  return (
    <View style={styles.imageContainer}>
      <Image style={styles.image} source={{ uri: thumbnail }} />
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    aspectRatio: 1,
    justifyContent: "center",
    margin: 5,
  },
  image: {
    aspectRatio: 1,
    resizeMode: "cover",
    borderRadius: 10,
  },
});
