import React from "react";
import { Image, StyleSheet, View } from "react-native";

export default function ProfileAvatar() {
  const uri =
    "https://avatars1.githubusercontent.com/u/48052622?s=400&u=a6aefc01e1ed6d8407e868a66227716d1813182b&v=4";

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri }}></Image>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    margin: 30,
  },
});
