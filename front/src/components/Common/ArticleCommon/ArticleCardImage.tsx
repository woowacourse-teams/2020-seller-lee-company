import React from "react";
import { Image, StyleSheet, View } from "react-native";

interface ArticleCardImageProps {
  thumbnail: string;
}

export default function ArticleCardImage({ thumbnail }: ArticleCardImageProps) {
  return (
    <View style={styles.imageContainer}>
      <Image
        style={styles.image}
        source={{ uri: thumbnail ? thumbnail : undefined }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    aspectRatio: 1,
    justifyContent: "center",
  },
  image: {
    aspectRatio: 1,
    resizeMode: "cover",
    borderRadius: 10,
  },
});
