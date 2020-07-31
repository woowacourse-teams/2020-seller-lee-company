/**
 * @author kouz95
 */

import React from "react";
import { Image, StyleSheet, View } from "react-native";

interface ImageBoxProps {
  imageURI: string;
  marginBottom: number;
}

export default function ImageBox({ imageURI, marginBottom }: ImageBoxProps) {
  return (
    <View style={styles.imageContainer || { marginBottom: marginBottom }}>
      <Image source={{ uri: imageURI }} style={styles.image} />
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: "contain",
  },
});
