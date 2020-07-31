/**
 * @author joseph415
 */

import React, { useEffect, useRef, useState } from "react";
import { Alert, Animated, StyleSheet, View } from "react-native";
import axios from "axios";
import { AntDesign } from "@expo/vector-icons";
import { ArticleDetailFavoriteProp } from "../types/types";
import theme from "../colors";

export default function ArticleDetailFavorite({
  articleId,
}: ArticleDetailFavoriteProp) {
  const [favoriteState, setFavoriteState] = useState(false);
  const AnimateIcon = Animated.createAnimatedComponent(AntDesign);

  const springValue = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const getRequest = async () => {
      const {
        data: { myFavoriteState },
      } = await axios.get(`/favorite/1/${articleId}`, {
        timeout: 1000,
      });
      setFavoriteState(myFavoriteState);
    };

    getRequest();
  }, [articleId]);

  const fulfillHeartAnimate = () => {
    springValue.setValue(0.33);
    Animated.timing(springValue, {
      toValue: 1,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  const unmarkFavorite = async () => {
    setFavoriteState(false);
    await axios.delete(`/favorite/1/${articleId}`);
  };

  const markFavorite = async () => {
    setFavoriteState(true);
    await axios.post(`/favorite/1/${articleId}`);
  };

  const toggleFavorite = () => {
    if (favoriteState) {
      unmarkFavorite();
    } else {
      markFavorite();
    }
    fulfillHeartAnimate();
  };

  return (
    <View style={styles.container}>
      <AnimateIcon
        name={favoriteState ? "heart" : "hearto"}
        size={25}
        color={favoriteState ? theme.others : "black"}
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
