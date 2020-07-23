/**
 * @author joseph415
 */

import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { FeedArticle } from "../../types/types";
import FeedArticleTag from "./FeedArticleTag";
import { FontAwesome } from "@expo/vector-icons";
import replacePriceWithCommas from "../../replacePriceWithCommas";
import Swiper from "react-native-swiper";
import ActiveDot from "./ActiveDot";
import Dot from "./Dot";
import ImageBox from "./ImageBox";

export default function FeedArticleCard({ feedArticle }: FeedArticle) {
  return (
    <View style={styles.articleContainer}>
      <View style={styles.photoContainer}>
        <Swiper
          loop={false}
          dot={Dot()}
          activeDot={ActiveDot()}
          paginationStyle={styles.pagination}
        >
          {feedArticle.images.map((image) => (
            <ImageBox key={image.id} imageTypeProps={image} />
          ))}
        </Swiper>
      </View>
      <View style={styles.articleSemiDetailsContainer}>
        <View style={styles.detailsContainer}>
          <View style={styles.detailsHeartContainer}>
            <FontAwesome name="heart-o" size={28} color="black" />
            <Text style={styles.text}> x 100</Text>
          </View>
          <View style={styles.detailsPriceContainer}>
            <Text style={styles.text}>
              {replacePriceWithCommas(feedArticle.price)}원
            </Text>
          </View>
        </View>
        <View style={styles.tagContainer}>
          {feedArticle.tagBoxes.map((tagItem) => (
            <FeedArticleTag key={tagItem.id} tagBox={tagItem} />
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  articleContainer: {
    paddingVertical: 15,
    aspectRatio: 4 / 3,
  },
  photoContainer: {
    paddingHorizontal: 8,
    flex: 3,
  },
  pagination: {
    bottom: 15,
  },
  articleSemiDetailsContainer: {
    flex: 1.3,
  },
  detailsContainer: {
    flexDirection: "row",
    flex: 1,
    paddingHorizontal: 8,
  },
  detailsHeartContainer: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
  },
  text: { fontWeight: "bold" },
  detailsPriceContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  tagContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
  },
});
