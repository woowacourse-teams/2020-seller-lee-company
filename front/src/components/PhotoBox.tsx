/**
 * @author joseph415
 */

import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { PhotoInfo } from "../types/types";

export interface PhotoBoxProps {
  photoInfoProps: PhotoInfo;
}

export default function PhotoBox({ photoInfoProps }: PhotoBoxProps) {
  return (
    <View style={styles.imageContainer}>
      <Image source={{ uri: photoInfoProps.uri }} style={styles.image} />
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
    resizeMode: "cover",
  },
});
