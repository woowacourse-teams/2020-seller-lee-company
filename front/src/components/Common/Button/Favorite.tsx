/**
 * @author joesph415
 */

import React, { useRef, useState } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";

interface FavoriteProp {
  count: number;
}

export default function Favorite({ count }: FavoriteProp) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteCount, setFavoriteCount] = useState(count);
  const [id, setId] = useState(0);
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

  const toggleAndFetchFavorite = async () => {
    const unmarkFavorite = () => {
      setIsFavorite(false);
      setFavoriteCount(favoriteCount - 1);
    };

    const markFavorite = () => {
      setIsFavorite(true);
      setFavoriteCount(favoriteCount + 1);
    };

    if (isFavorite) {
      unmarkFavorite();
    } else {
      markFavorite();
    }
    fulfillHeartAnimate();
  };

  return (
    <View style={styles.detailsHeartContainer}>
      <AnimateIcon
        name={isFavorite ? "heart" : "hearto"}
        size={23}
        color={isFavorite ? "red" : "black"}
        onPress={toggleAndFetchFavorite}
        style={{
          transform: [{ scale: springValue }],
        }}
      />
      <Text
        onPress={() => {
          // do nothing
        }}
        style={styles.text}
      >
        {" "}
        x {favoriteCount}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  detailsHeartContainer: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
  },
  text: { fontWeight: "bold" },
});
