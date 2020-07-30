/**
 * @author joseph415
 */

import React, { useEffect, useRef, useState } from "react";
import { Alert, Animated, StyleSheet, View } from "react-native";
import axios from "axios";
import { AntDesign } from "@expo/vector-icons";
import { ArticleDetailFavoriteProp } from "../types/types";

export default function ArticleDetailFavorite({
  article_id,
}: ArticleDetailFavoriteProp) {
  const [favoriteState, setFavoriteState] = useState(false);
  const AnimateIcon = Animated.createAnimatedComponent(AntDesign);

  const springValue = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const getRequest = async () => {
      const {
        data: { myFavoriteState },
      } = await axios.get(`/favorite/1/${article_id}`, {
        timeout: 1000,
      });
      setFavoriteState(myFavoriteState);
    };

    getRequest().catch((reason) => Alert.alert(reason));
  }, [article_id]);

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
    await axios.delete(`/favorite/1/${article_id}`);
  };

  const markFavorite = async () => {
    setFavoriteState(true);
    await axios.post(`/favorite/1/${article_id}`);
  };

  const toggleFavorite = () => {
    if (favoriteState) {
      unmarkFavorite().catch((reason) => Alert.alert(reason));
    } else {
      markFavorite().catch((reason) => Alert.alert(reason));
    }
    fulfillHeartAnimate();
  };

  return (
    <View style={styles.detailsHeartContainer}>
      <AnimateIcon
        name={favoriteState ? "heart" : "hearto"}
        size={25}
        color={favoriteState ? "red" : "black"}
        onPress={toggleFavorite}
        style={{
          transform: [{ scale: springValue }],
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  detailsHeartContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});
