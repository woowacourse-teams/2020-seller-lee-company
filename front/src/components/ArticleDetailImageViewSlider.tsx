/**
 * @author kouz95
 */

import React from "react";
import ImageBox from "./ImageBox";
import { ImageURISource, StyleSheet } from "react-native";
import ImageViewSliderDot from "./ImageViewSliderDot";
import Swiper from "react-native-swiper";
import ActiveDot from "./ActiveDot";

interface ImageSliderProps {
  images: ImageURISource[];
}

export default function ArticleDetailImageViewSlider({
  images,
}: ImageSliderProps) {
  return (
    <Swiper
      loadMinimal={true}
      loop={false}
      dot={<ImageViewSliderDot />}
      activeDot={<ActiveDot />}
      paginationStyle={styles.pagination}
      centerContent={true}
      style={styles.container}
    >
      {images.map((imageURISource, index) => (
        <ImageBox imageURI={imageURISource} key={index} marginBottom={50} />
      ))}
    </Swiper>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
  },
  pagination: {
    bottom: 30,
  },
});
