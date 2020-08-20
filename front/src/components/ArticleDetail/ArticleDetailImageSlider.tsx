import React from "react";
import { StyleSheet } from "react-native";
import Swiper from "react-native-swiper";
import ActiveDot from "../Common/Dot/ActiveDot";
import Dot from "../Common/Dot/Dot";
import TouchablePhoto from "../Common/Photo/TouchablePhoto";

export default function ArticleDetailImageSlider({
  photos,
}: {
  photos: string[];
}) {
  return (
    <Swiper
      loadMinimal={false}
      loop={false}
      dot={<Dot />}
      activeDot={<ActiveDot />}
      paginationStyle={styles.pagination}
      centerContent={true}
    >
      {photos.map((photo) => (
        <TouchablePhoto photo={photo} key={photo} />
      ))}
    </Swiper>
  );
}

const styles = StyleSheet.create({
  pagination: {
    bottom: 15,
  },
});
