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
      centerContent={true}
      key={photos.length}
    >
      {photos.map((photo, index) => (
        <TouchableOpacity
          activeOpacity={1}
          style={styles.container}
          key={index}
        >
          <Image source={{ uri: photo }} style={styles.image} />
        </TouchableOpacity>
      ))}
    </Swiper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    aspectRatio: 1,
    resizeMode: "cover",
  },
});
