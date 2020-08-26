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

export default function FeedArticleCard({
  id,
  price,
  tags,
  favoriteCount,
  photos,
  favoriteState,
}: Feed) {
  const ANIMATE_START_VALUE = 0.93;

  const navigation = useNavigation<FeedHomeNavigationProp>();
  const setArticleSelectedId = useSetRecoilState(articleSelectedIdState);

  const AnimateTouchableWithoutFeedback = Animated.createAnimatedComponent(
    TouchableWithoutFeedback,
  );

  const clickValue = useRef(new Animated.Value(0)).current;

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
            <View style={styles.tagContainer}>
              {tags.map((tag, index) => (
                <FeedArticleTag key={index} tag={tag} />
              ))}
            </View>
            <View style={styles.priceContainer}>
              <Text style={styles.priceText}>
                {insertComma(price.toString())}원
              </Text>
            </View>
          </View>
          <View style={styles.favoriteContainer}>
            <Favorite
              articleId={id}
              state={favoriteState}
              count={favoriteCount}
            />
          </View>
        </View>
      </View>
    </AnimateTouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  articleContainer: {
    aspectRatio: 5 / 6,
  },
  photoContainer: {
    flex: 5,
  },
  articleSemiDetailsContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  detailsContainer: {
    justifyContent: "space-evenly",
  },
  tagContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  priceContainer: {
    justifyContent: "center",
    alignItems: "flex-start",
  },
  priceText: {
    fontWeight: "bold",
    fontSize: 18,
  },
  favoriteContainer: {},
});
