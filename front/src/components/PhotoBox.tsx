/**
 * @author joseph415
 */

import React from "react";
import { Image, StyleSheet, View } from "react-native";

export interface PhotoBoxProps {
  photo: string | undefined;
}

export default function PhotoBox({ photo }: PhotoBoxProps) {
  return (
    <View style={styles.imageContainer}>
      <Image source={{ uri: photo }} style={styles.image} />
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
