/**
 * @author kouz95
 */

import React from "react";
import { ImageURISource, StyleSheet, View } from "react-native";
import ArticleDetailImageSlider from "../components/ArticleDetailImageSlider";

interface ImageSliderProps {
  images: ImageURISource[];
}

export default function ArticleDetailScreen() {
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
        <ArticleDetailImageSlider images={getMockImages()} />
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
