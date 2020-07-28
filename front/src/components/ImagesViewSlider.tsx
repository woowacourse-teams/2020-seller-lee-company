/**
 * @author kouz95
 */

import React from "react";
import ImageBox from "./ImageBox";
import { ImageURISource, StyleSheet } from "react-native";
import Dot from "./Dot";
import Swiper from "react-native-swiper";
import ActiveDot from "./ActiveDot";

interface ImageSliderProps {
  images: ImageURISource[];
}

export default function ImagesViewSlider({ images }: ImageSliderProps) {
  let imageId = 0;

  return (
    <Swiper
      loadMinimal={true}
      loop={false}
      dot={Dot()}
      activeDot={ActiveDot()}
      paginationStyle={styles.pagination}
      centerContent={true}
    >
      {images.map((imageURISource) => (
        <ImageBox imageURI={imageURISource} key={++imageId} />
      ))}
    </Swiper>
  );
}

const styles = StyleSheet.create({
  pagination: {
    bottom: 15,
  },
});
