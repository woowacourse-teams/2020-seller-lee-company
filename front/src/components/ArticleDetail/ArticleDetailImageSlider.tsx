import React from "react";
import { StyleSheet } from "react-native";
import ActiveDot from "../Common/Dot/ActiveDot";
import Dot from "../Common/Dot/Dot";
import TouchablePhoto from "../Common/Photo/TouchablePhoto";
import Swiper from "react-native-swiper";

interface ArticleDetailImageSliderProps {
  photos: string[];
}

export default function ArticleDetailImageSlider({
  photos,
}: ArticleDetailImageSliderProps) {
  return (
    <Swiper
      loadMinimal={true}
      loop={false}
      dot={<Dot />}
      activeDot={<ActiveDot />}
      paginationStyle={styles.pagination}
      centerContent={true}
      key={photos.length}
    >
      {photos.map((photo, index) => (
        <TouchablePhoto photo={photo} key={index} />
      ))}
    </Swiper>
  );
}

const styles = StyleSheet.create({
  pagination: {
    bottom: 45,
  },
});
