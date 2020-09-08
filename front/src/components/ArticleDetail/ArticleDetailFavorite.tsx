import React, { useRef } from "react";
import { Animated, StyleSheet, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import theme from "../../colors";
import { useRecoilState, useSetRecoilState } from "recoil/dist";
import {
  articleIsModifiedState,
  articleSelectedState,
} from "../../states/articleState";
import { favoriteAPI } from "../../api/api";

export default function ArticleDetailFavorite() {
  const [article, setArticle] = useRecoilState(articleSelectedState);
  const setIsModified = useSetRecoilState(articleIsModifiedState);

  const AnimateIcon = Animated.createAnimatedComponent(AntDesign);
  const springValue = useRef(new Animated.Value(1)).current;

  const fulfillHeartAnimate = () => {
    setIsModified(true);
    springValue.setValue(0.33);
    Animated.spring(springValue, {
      toValue: 1,
      friction: 3.5,
      useNativeDriver: true,
    }).start();
  };

  const unmarkFavorite = async () => {
    await favoriteAPI.delete({ articleId: article.id });
    setArticle({ ...article, favoriteState: false });
  };

  const markFavorite = async () => {
    await favoriteAPI.post({ articleId: article.id });
    setArticle({ ...article, favoriteState: true });
  };

  const toggleFavorite = async () => {
    if (article.favoriteState) {
      await unmarkFavorite();
    } else {
      await markFavorite();
    }
    fulfillHeartAnimate();
  };

  return (
    <TouchableOpacity onPress={toggleFavorite} style={styles.container}>
      <AnimateIcon
        name={article.favoriteState ? "heart" : "hearto"}
        size={32}
        color={article.favoriteState ? theme.heart : "black"}
        style={{
          transform: [{ scale: springValue }],
        }}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    aspectRatio: 1,
    alignItems: "center",
  },
});
