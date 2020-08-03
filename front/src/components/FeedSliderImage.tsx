/**
 * @author joseph415
 */

import React from "react";
import PhotoBox from "./PhotoBox";
import { StyleSheet, TouchableOpacity } from "react-native";
import Swiper from "react-native-swiper";
import Dot from "./Dot";
import ActiveDot from "./ActiveDot";

export interface FeedSliderImageProp {
  photos: string[];
}

export default function FeedSliderImage({ photos }: FeedSliderImageProp) {
  return (
    <Swiper
      loadMinimal={true}
      loop={false}
      dot={<Dot />}
      activeDot={<ActiveDot />}
      paginationStyle={styles.pagination}
      centerContent={true}
    >
      {photos.map((photo, index) => (
        <TouchableOpacity
          activeOpacity={1}
          style={styles.imageContainer}
          key={index}
        >
          {console.log(photo)}
          <PhotoBox photo={photo} />
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
