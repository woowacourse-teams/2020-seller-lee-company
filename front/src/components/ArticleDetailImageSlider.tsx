/**
 * @author kouz95
 */

import React from "react";
import ImageBox from "./ImageBox";
import { ImageURISource, StyleSheet, TouchableOpacity } from "react-native";

import Swiper from "react-native-swiper";
import ActiveDot from "./ActiveDot";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack/lib/typescript/src/types";
import { ImageSliderParamList } from "../types/types";
import Dot from "./Dot";

interface ImageSliderProps {
  images: ImageURISource[];
}

export default function ArticleDetailImageSlider({ images }: ImageSliderProps) {
  const navigation = useNavigation<StackNavigationProp<ImageSliderParamList>>();
  let imageId = 0;

  return (
    <Swiper
      loadMinimal={true}
      loop={false}
      dot={<Dot />}
      activeDot={<ActiveDot />}
      paginationStyle={styles.pagination}
      centerContent={true}
    >
      {images.map((imageURISource) => (
        <TouchableOpacity
          activeOpacity={1}
          style={styles.buttonOnImage}
          key={++imageId}
          onPress={() =>
            navigation.navigate("ArticleDetailImageViewScreen", {
              images: images,
            })
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
