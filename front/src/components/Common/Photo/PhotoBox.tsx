import React from "react";
import { Image, StyleSheet, View } from "react-native";

interface PhotoBoxProps {
  photo: string;
}

export default function PhotoBox({ photo }: PhotoBoxProps) {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: photo === "" ? undefined : photo }}
        style={styles.image}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    aspectRatio: 1,
    resizeMode: "cover",
  },
});
