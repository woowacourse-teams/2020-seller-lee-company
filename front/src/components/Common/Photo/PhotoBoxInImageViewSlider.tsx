import React from "react";
import { Image, StyleSheet, View } from "react-native";

interface PhotoBoxProps {
  photoURI: string;
}

export default function PhotoBoxInImageViewSlider({ photoURI }: PhotoBoxProps) {
  return (
    <View style={styles.imageContainer}>
      <Image source={{ uri: photoURI ? photoURI : "" }} style={styles.image} />
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    marginBottom: 50,
  },
  image: {
    flex: 1,
    resizeMode: "contain",
  },
});
