/**
 * @author kouz95
 */

import React from "react";
import { ImageURISource, StyleSheet, View } from "react-native";
import ImageSlider from "../components/ImageSlider";

interface ImageSliderProps {
  images: ImageURISource[];
}

export default function ImageSliderScreen() {
  const getMockImages = () => {
    return [
      require("../../assets/favicon.png"),
      require("../../assets/icon.png"),
      require("../../assets/splash.png"),
    ];
  };

  return (
    <>
      <View style={styles.imageSliderContainer}>
        <ImageSlider images={getMockImages()} />
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
