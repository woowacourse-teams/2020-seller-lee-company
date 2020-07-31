/**
 * @author kouz95
 */

import React from "react";
import ImageBox from "./ImageBox";
import { StyleSheet, TouchableOpacity } from "react-native";

import Swiper from "react-native-swiper";
import ActiveDot from "./ActiveDot";
import { useNavigation } from "@react-navigation/native";
import { ArticleDetailScreenProp } from "../types/types";
import Dot from "./Dot";

interface ArticleDetailImageSliderProps {
  photos: string[];
}

export default function ArticleDetailImageSlider({
  photos,
}: ArticleDetailImageSliderProps) {
  const navigation = useNavigation<ArticleDetailScreenProp>();

  return (
    <Swiper
      loadMinimal={true}
      loop={false}
      dot={<Dot />}
      activeDot={<ActiveDot />}
      paginationStyle={styles.pagination}
      centerContent={true}
    >
      {photos.map((imageURISource, index) => (
        <TouchableOpacity
          activeOpacity={1}
          style={styles.buttonOnImage}
          key={index}
          onPress={() =>
            navigation.navigate("ArticleDetailImageViewScreen", {
              photos: photos,
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
