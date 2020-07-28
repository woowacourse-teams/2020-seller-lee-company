/**
 * @author joseph415
 */

import React from "react";
import ImageBox from "./ImageBox";
import { StyleSheet, TouchableOpacity } from "react-native";
import { FeedArticle } from "../types/types";
import Swiper from "react-native-swiper";
import Dot from "./Dot";
import ActiveDot from "./ActiveDot";

export default function FeedSliderImage({ feedArticle }: FeedArticle) {
  return (
    <Swiper
      loadMinimal={true}
      loop={false}
      dot={<Dot />}
      activeDot={<ActiveDot />}
      paginationStyle={styles.pagination}
      centerContent={true}
    >
      {feedArticle.images.map((image) => (
        <TouchableOpacity
          activeOpacity={1}
          style={styles.imageContainer}
          key={image.id}
        >
          <ImageBox imageTypeProps={image} />
        </TouchableOpacity>
      ))}
    </Swiper>
  );
}

const styles = StyleSheet.create({
  pagination: {
    bottom: 15,
  },
  imageContainer: {
    flex: 1,
  },
});
