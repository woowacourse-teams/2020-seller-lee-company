/**
 * @author kouz95
 */

import React from "react";
import PhotoBox from "../Common/Photo/PhotoBox";
import { StyleSheet, TouchableOpacity } from "react-native";

import Swiper from "react-native-swiper";
import ActiveDot from "../Common/Dot/ActiveDot";
import { useNavigation } from "@react-navigation/native";
import { ArticleDetailScreenProp } from "../../types/types";
import Dot from "../Common/Dot/Dot";
import { useRecoilValue } from "recoil/dist";
import { articleSelectedState } from "../../states/articleState";

export default function ArticleDetailImageSlider() {
  const navigation = useNavigation<ArticleDetailScreenProp>();
  const { photos } = useRecoilValue(articleSelectedState);

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
          style={styles.buttonOnImage}
          key={index}
          onPress={() => navigation.navigate("ArticleDetailImageViewScreen")}
        >
          <PhotoBox photoURI={photo} marginBottom={0} />
        </TouchableOpacity>
      ))}
    </Swiper>
  );
}

const styles = StyleSheet.create({
  pagination: {
    bottom: 15,
  },
  buttonOnImage: {
    flex: 1,
  },
});
