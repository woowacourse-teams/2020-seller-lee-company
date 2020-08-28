import React, { useRef } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Feed, HomeStackParam, RootStackParam } from "../../types/types";
import FeedArticleTag from "./FeedArticleTag";
import FeedFavorite from "./FeedFavorite";
import FeedSliderImage from "./FeedSliderImage";
import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { insertComma } from "../../replacePriceWithComma";
import { useSetRecoilState } from "recoil/dist";
import { articleSelectedIdState } from "../../states/articleState";
import MaskedView from "@react-native-community/masked-view";
import { StackNavigationProp } from "@react-navigation/stack";

const ANIMATE_START_VALUE = 0.93;

type FeedArticleCardNavigationProp = CompositeNavigationProp<
  StackNavigationProp<HomeStackParam, "FeedHomeScreen">,
  StackNavigationProp<RootStackParam, "HomeStack">
>;

export default function FeedArticleCard({
  id,
  price,
  tags,
  favoriteCount,
  photos,
  favoriteState,
}: Feed) {
  const navigation = useNavigation<FeedArticleCardNavigationProp>();
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
          <MaskedView
            style={StyleSheet.absoluteFill}
            maskElement={<View style={styles.maskedElement} />}
          >
            <FeedSliderImage photos={photos} />
          </MaskedView>
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
            <FeedFavorite
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
  maskedElement: {
    flex: 1,
    borderRadius: 30,
    backgroundColor: "white",
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
