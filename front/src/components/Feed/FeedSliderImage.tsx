/**
 * @author joseph415
 */

import React from "react";
import ImageBox from "./ImageBox";
import { StyleSheet, TouchableOpacity } from "react-native";
import { FeedArticle } from "../../types/types";
import Swiper from "react-native-swiper";
import { useRecoilState } from "recoil/dist";
import { favoriteState, isFavoriteState } from "../../states/heartState";

export default function FeedSliderImage({ feedArticle }: FeedArticle) {
  let lastTap: number | null = null;
  const [isFavorite, setIsFavorite] = useRecoilState(isFavoriteState);
  const [favorite, setFavorite] = useRecoilState(favoriteState);

  const checkFavorite = () => {
    if (isFavorite) {
      setIsFavorite(false);
      setFavorite(favorite - 1);
    } else {
      setIsFavorite(true);
      setFavorite(favorite + 1);
    }
  };

  const detectDoubleTap = () => {
    const now = Date.now();
    const DOUBLE_PRESS_DELAY = 300;
    if (lastTap && now - lastTap < DOUBLE_PRESS_DELAY) {
      checkFavorite();
    } else {
      lastTap = now;
    }
  };

  return (
    <Swiper
      loadMinimal={true}
      loop={false}
      dotStyle={styles.dot}
      activeDotStyle={styles.activeDot}
      paginationStyle={styles.pagination}
      centerContent={true}
    >
      {feedArticle.images.map((image) => (
        <TouchableOpacity
          activeOpacity={1}
          style={styles.imageContainer}
          key={image.id}
          onPress={() => detectDoubleTap()}
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
  dot: {
    backgroundColor: "rgba(0,0,0,.2)",
    width: 5,
    height: 5,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3,
  },
  activeDot: {
    backgroundColor: "#eeecda",
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3,
  },
  imageContainer: {
    flex: 1,
  },
});
