/**
 * @author joseph415
 */

import React from "react";
import ImageBox from "./ImageBox";
import { StyleSheet, TouchableOpacity } from "react-native";
import { FeedArticle } from "../../types/types";
import Dot from "./Dot";
import ActiveDot from "./ActiveDot";
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
      loop={false}
      dot={Dot()}
      activeDot={ActiveDot()}
      paginationStyle={styles.pagination}
      centerContent={true}
    >
      {feedArticle.images.map((image) => (
        <TouchableOpacity
          activeOpacity={1}
          style={{ flex: 1 }}
          key={image.id}
          onPress={() => {
            detectDoubleTap();
          }}
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
});
