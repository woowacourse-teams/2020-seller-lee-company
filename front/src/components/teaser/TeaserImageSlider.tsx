import React from "react";
import { StyleSheet, View } from "react-native";
import TeaserImage from "./TeaserImage";

export default function TeaserImageSlider() {
  return (
    <View style={styles.container}>
      <TeaserImage sourceUrl={require("../../../assets/wave.jpeg")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
