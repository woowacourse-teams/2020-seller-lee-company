/**
 * @author joseph415
 */

import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { ImageTypeProps } from "../../types/types";

export default function ImageBox({ imageTypeProps }: ImageTypeProps) {
  return (
    <View style={styles.imageContainer}>
      <Image source={imageTypeProps.location} style={styles.image} />
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
