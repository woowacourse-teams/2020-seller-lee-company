/**
 * @author joseph415
 */

import React, { useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";
import axios from "axios";
import { AntDesign } from "@expo/vector-icons";
import theme from "../../colors";
import { useRecoilState } from "recoil/dist";
import { articleSelectedState } from "../../states/articleState";

export default function ArticleDetailFavorite() {
  const [article, setArticle] = useRecoilState(articleSelectedState);
  const AnimateIcon = Animated.createAnimatedComponent(AntDesign);

  const springValue = useRef(new Animated.Value(1)).current;

  const fulfillHeartAnimate = () => {
    springValue.setValue(0.33);
    Animated.timing(springValue, {
      toValue: 1,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  const unmarkFavorite = async () => {
    setArticle({ ...article, favoriteState: false });
    await axios.delete(`/favorite/1`);
  };

  const markFavorite = async () => {
    setArticle({ ...article, favoriteState: true });
    await axios.post(`/favorite/1`);
  };

  const toggleFavorite = () => {
    if (article.favoriteState) {
      unmarkFavorite();
    } else {
      markFavorite();
    }
    fulfillHeartAnimate();
  };

  return (
    <View style={styles.container}>
      <AnimateIcon
        name={article.favoriteState ? "heart" : "hearto"}
        size={25}
        color={article.favoriteState ? theme.others : "black"}
        onPress={toggleFavorite}
        style={{
          transform: [{ scale: springValue }],
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
});
