/**
 * @author kouz95
 */

import React from "react";
import { StyleSheet, View } from "react-native";
import ImageSlider from "../components/ImageSlider";

export default function ImagesViewScreen() {
  return (
    <View style={styles.container}>
      <ImageSlider
        images={[
          require("../../assets/favicon.png"),
          require("../../assets/icon.png"),
          require("../../assets/splash.png"),
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
