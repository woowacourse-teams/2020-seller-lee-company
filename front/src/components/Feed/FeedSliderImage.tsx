import React from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import Swiper from "react-native-swiper";
import Dot from "../Common/Dot/Dot";
import ActiveDot from "../Common/Dot/ActiveDot";

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
          <Image source={{ uri: photo }} style={styles.image} />
        </TouchableOpacity>
      ))}
    </Swiper>
  );
}

const styles = StyleSheet.create({
  pagination: {},
  imageContainer: {
    flex: 1,
  },
  image: {
    flex: 1,
    borderRadius: 30,
  },
});
