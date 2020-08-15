import React, { useRef } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Feed, FeedHomeNavigationProp } from "../../types/types";
import FeedArticleTag from "./FeedArticleTag";
import Favorite from "../Common/Button/Favorite";
import FeedSliderImage from "./FeedSliderImage";
import { useNavigation } from "@react-navigation/native";
import { insertComma } from "../../replacePriceWithComma";
import { useSetRecoilState } from "recoil/dist";
import { articleSelectedIdState } from "../../states/articleState";

const ANIMATE_START_VALUE = 0.93;

export default function FeedArticleCard({
  id,
  price,
  tags,
  favoriteCount,
  photos,
  favoriteState,
}: Feed) {
  const navigation = useNavigation<FeedHomeNavigationProp>();
  const setArticleSelectedId = useSetRecoilState(articleSelectedIdState);

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
        setArticleSelectedId(id);
        navigation.navigate("ArticleDetailScreen");
      }}
      style={{ transform: [{ scale: clickValue }] }}
    >
      <View style={styles.articleContainer}>
        <View style={styles.photoContainer}>
          <FeedSliderImage photos={photos} />
        </View>
        <View style={styles.articleSemiDetailsContainer}>
          <View style={styles.detailsContainer}>
            <Favorite
              articleId={id}
              state={favoriteState}
              count={favoriteCount}
            />
            <View style={styles.detailsPriceContainer}>
              <Text style={styles.text}>{insertComma(price.toString())}원</Text>
            </View>
          </View>
          <View style={styles.tagContainer}>
            {tags.map((tag, index) => (
              <FeedArticleTag key={index} tag={tag} />
            ))}
          </View>
        </View>
      </View>
    </AnimateTouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  articleContainer: {
    marginVertical: 3,
    marginLeft: 6,
    paddingVertical: 15,
    backgroundColor: "#FFF",
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
