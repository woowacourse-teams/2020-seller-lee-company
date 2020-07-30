/**
 * @author kouz95
 */

import React from "react";
import { Image, ImageURISource, StyleSheet, View } from "react-native";

interface ImageBoxProps {
  imageURI: ImageURISource;
  marginBottom: number;
}

export default function ImageBox({ imageURI, marginBottom }: ImageBoxProps) {
  return (
    <View style={styles.imageContainer || { marginBottom: marginBottom }}>
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
    resizeMode: "contain",
  },
});
