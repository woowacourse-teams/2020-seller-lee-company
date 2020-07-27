/**
 * @author joseph415
 */

import React, { useRef } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { FeedArticle, FeedNavigationProp } from "../../types/types";
import FeedArticleTag from "./FeedArticleTag";
import replacePriceWithCommas from "../../replacePriceWithCommas";
import Favorite from "./Favorite";
import FeedSliderImage from "./FeedSliderImage";
import { useSetRecoilState } from "recoil/dist";
import { favoriteState } from "../../states/heartState";
import { useNavigation } from "@react-navigation/native";

const ANIMATE_START_VALUE = 0.93;

export default function FeedArticleCard({ feedArticle }: FeedArticle) {
  const navigation = useNavigation<FeedNavigationProp>();
  const setFavorite = useSetRecoilState(favoriteState);
  setFavorite(feedArticle.favorite);

  const AnimateTouchableWithoutFeedback = Animated.createAnimatedComponent(
    TouchableWithoutFeedback,
  );

  const clickValue = useRef(new Animated.Value(1)).current;

  const clickArticleAnimate = () => {
    clickValue.setValue(ANIMATE_START_VALUE);

    Animated.timing(clickValue, {
      toValue: 1,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  return (
    <AnimateTouchableWithoutFeedback
      onPress={() => {
        clickArticleAnimate();
        navigation.navigate("FeedArticle");
      }}
      style={{
        transform: [{ scale: clickValue }],
      }}
    >
      <View style={styles.articleContainer}>
        <View style={styles.photoContainer}>
          <FeedSliderImage feedArticle={feedArticle} />
        </View>
        <View style={styles.articleSemiDetailsContainer}>
          <View style={styles.detailsContainer}>
            <Favorite />
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
    </AnimateTouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  articleContainer: {
    marginHorizontal: 4,
    backgroundColor: "#FFF",
    paddingVertical: 15,
    borderRadius: 8,
    aspectRatio: 4 / 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 6,
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
