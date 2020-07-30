/**
 * @author kouz95
 */

import React from "react";
import ImageBox from "./ImageBox";
import { ImageURISource, StyleSheet, TouchableOpacity } from "react-native";

import Swiper from "react-native-swiper";
import ActiveDot from "./ActiveDot";
import { useNavigation } from "@react-navigation/native";
import { ImageSliderNavigationProp } from "../types/types";
import Dot from "./Dot";

interface ImageSliderProps {
  images: ImageURISource[];
}

export default function ArticleDetailImageSlider({ images }: ImageSliderProps) {
  const navigation = useNavigation<ImageSliderNavigationProp>();
  return (
    <Swiper
      loadMinimal={true}
      loop={false}
      dot={<Dot />}
      activeDot={<ActiveDot />}
      paginationStyle={styles.pagination}
      centerContent={true}
    >
      {images.map((imageURISource, index) => (
        <TouchableOpacity
          activeOpacity={1}
          style={styles.buttonOnImage}
          key={index}
          onPress={() =>
            navigation.navigate("ArticleDetailImageViewScreen", { images })
          }
        >
          <ImageBox imageURI={imageURISource} marginBottom={0} />
        </TouchableOpacity>
      ))}
    </Swiper>
  );
}

const styles = StyleSheet.create({
  pagination: {
    bottom: 15,
  },
  buttonOnImage: {
    flex: 1,
  },
});
