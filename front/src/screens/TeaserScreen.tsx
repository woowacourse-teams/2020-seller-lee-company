import React from "react";
import { StyleSheet, View } from "react-native";
import TeaserImageSlider from "../components/teaser/TeaserImageSlider";

export default function TeaserScreen() {
  return (
    <View style={styles.container}>
      <TeaserImageSlider />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
