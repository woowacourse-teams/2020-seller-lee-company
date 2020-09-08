import React, { useRef, useState } from "react";
import { Animated, StyleSheet, Text, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { favoriteAPI } from "../../api/api";
import theme from "../../colors";

interface FavoriteProp {
  articleId: number;
  state: boolean;
  count: number;
}

export default function FeedFavorite({
  articleId,
  state,
  count,
}: FavoriteProp) {
  const [favoriteState, setFavoriteState] = useState(state);
  const [favoriteCount, setFavoriteCount] = useState(count);

  const AnimateIcon = Animated.createAnimatedComponent(AntDesign);
  const springValue = useRef(new Animated.Value(1)).current;

  const fulfillHeartAnimate = () => {
    springValue.setValue(0.33);
    Animated.spring(springValue, {
      toValue: 1,
      friction: 3.5,
      useNativeDriver: true,
    }).start();
  };

  const toggleFavorite = async () => {
    const unmarkFavorite = async () => {
      await favoriteAPI.delete({ articleId });
      setFavoriteState(false);
      setFavoriteCount(favoriteCount - 1);
    };

    const markFavorite = async () => {
      await favoriteAPI.post({ articleId });
      setFavoriteState(true);
      setFavoriteCount(favoriteCount + 1);
    };

    if (favoriteState) {
      await unmarkFavorite();
    } else {
      await markFavorite();
    }
    fulfillHeartAnimate();
  };

  return (
    <TouchableOpacity onPress={toggleFavorite} style={styles.container}>
      <AnimateIcon
        name={favoriteState ? "heart" : "hearto"}
        size={26}
        color={favoriteState ? theme.heart : "black"}
        style={{
          transform: [{ scale: springValue }],
        }}
      />
      <Text style={styles.text}>{favoriteCount}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    aspectRatio: 1,
    alignItems: "center",
  },
  text: {
    fontWeight: "bold",
    fontSize: 16,
  },
});
