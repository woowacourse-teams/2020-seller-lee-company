import React from "react";
import { StyleSheet } from "react-native";
import ImageViewSliderDot from "../Common/Dot/ImageViewSliderDot";
import Swiper from "react-native-swiper";
import ActiveDot from "../Common/Dot/ActiveDot";
import { useRecoilValue } from "recoil/dist";
import { articleSelectedState } from "../../states/articleState";
import PhotoBoxInImageViewSlider from "../Common/Photo/PhotoBoxInImageViewSlider";

export default function ArticleDetailPhotoViewSlider() {
  const { photos } = useRecoilValue(articleSelectedState);
  return (
    <Swiper
      loadMinimal={true}
      loop={false}
      dot={<ImageViewSliderDot />}
      activeDot={<ActiveDot />}
      paginationStyle={styles.pagination}
      centerContent={true}
      style={styles.container}
      key={photos.length}
    >
      {photos.map((imageURISource, index) => (
        <PhotoBoxInImageViewSlider photoURI={imageURISource} key={index} />
      ))}
    </Swiper>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
  },
  pagination: {
    bottom: 30,
  },
});
