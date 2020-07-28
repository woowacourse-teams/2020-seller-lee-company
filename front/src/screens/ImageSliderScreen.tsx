/**
 * @author kouz95
 */

import React from "react";
import { StyleSheet, View } from "react-native";
import ImageSlider from "../components/ImageSlider";

export default function ImageSliderScreen() {
  return (
    <>
      <View style={styles.imageSliderContainer}>
        <ImageSlider
          images={[
            require("../../assets/favicon.png"),
            require("../../assets/icon.png"),
            require("../../assets/splash.png"),
          ]}
        />
      </View>
      <View style={styles.mockContainer} />
    </>
  );
}

const styles = StyleSheet.create({
  imageSliderContainer: {
    flex: 1,
  },
  mockContainer: {
    flex: 1,
  },
});
