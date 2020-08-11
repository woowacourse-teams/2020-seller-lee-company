/**
 * @author kouz95
 */

import React from "react";

import { StyleSheet } from "react-native";
import ImageViewSliderDot from "../Common/Dot/ImageViewSliderDot";
import Swiper from "react-native-swiper";
import ActiveDot from "../Common/Dot/ActiveDot";
import PhotoBox from "../Common/Photo/PhotoBox";
import { useRecoilValue } from "recoil/dist";
import { articleSelectedState } from "../../states/articleState";

export default function ArticleDetailImageViewSlider() {
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
    >
      {photos.map((imageURISource, index) => (
        <PhotoBox photoURI={imageURISource} key={index} marginBottom={50} />
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
