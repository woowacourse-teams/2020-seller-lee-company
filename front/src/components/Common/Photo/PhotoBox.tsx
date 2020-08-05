/**
 * @author kouz95
 */

import React from "react";
import { Image, StyleSheet, View } from "react-native";

interface PhotoBoxProps {
  photoURI: string;
  marginBottom: number;
}

export default function PhotoBox({ photoURI, marginBottom }: PhotoBoxProps) {
  return (
    <View style={styles.imageContainer || { marginBottom: marginBottom }}>
      <Image source={{ uri: photoURI ? photoURI : "" }} style={styles.image} />
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
  },
});
