/**
 * @author kouz95
 */

import React from "react";
import ImageBox from "./ImageBox";
import { ImageURISource, StyleSheet, TouchableOpacity } from "react-native";
import Dot from "./Dot";
import Swiper from "react-native-swiper";
import ActiveDot from "./ActiveDot";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack/lib/typescript/src/types";
import { ImageSliderParamList } from "../types/types";

interface ImageSliderProps {
  images: ImageURISource[];
}

export default function ImageSlider({ images }: ImageSliderProps) {
  const navigation = useNavigation<StackNavigationProp<ImageSliderParamList>>();
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
        <TouchableOpacity
          activeOpacity={1}
          style={styles.buttonOnImage}
          key={++imageId}
          onPress={() => navigation.navigate("ImagesViewScreen")}
        >
          <ImageBox imageURI={imageURISource} />
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
