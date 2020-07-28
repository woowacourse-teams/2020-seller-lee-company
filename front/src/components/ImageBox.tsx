/**
 * @author kouz95
 */

import React from "react";
import { Image, ImageURISource, StyleSheet, View } from "react-native";

interface ImageBoxProps {
  imageURI: ImageURISource;
}

export default function ImageBox({ imageURI }: ImageBoxProps) {
  return (
    <View style={styles.imageContainer}>
      <Image source={imageURI} style={styles.image} />
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
  },
  image: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
});
