/**
 * @author joesph415
 */

import React, { useRef, useState } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useRecoilState } from "recoil/dist";
import { favoriteState, isFavoriteState } from "../../states/heartState";
import { FeedArticle } from "../../types/types";

interface HeartProps {
  isFavoriteProp: boolean;
  favoriteProp: number;
}

export default function Heart() {
  const [isFavorite, setIsFavorite] = useRecoilState(isFavoriteState);
  const [favorite, setFavorite] = useRecoilState(favoriteState);
  const AnimateIcon = Animated.createAnimatedComponent(AntDesign);

  const springValue = useRef(new Animated.Value(1)).current;

  const fulfillHeart = () => {
    springValue.setValue(0.33);
    Animated.timing(springValue, {
      toValue: 1,
      duration: 150,
      useNativeDriver: true,
    }).start();
    checkFavorite();
  };

  const checkFavorite = () => {
    if (isFavorite) {
      setIsFavorite(false);
      setFavorite(favorite - 1);
    } else {
      setIsFavorite(true);
      setFavorite(favorite + 1);
    }
  };

  return (
    <View style={styles.detailsHeartContainer}>
      <AnimateIcon
        name={isFavorite ? "heart" : "hearto"}
        size={23}
        color={isFavorite ? "red" : "black"}
        onPress={fulfillHeart}
        style={{
          transform: [{ scale: springValue }],
        }}
      />
      <Text style={styles.text}> x {favorite}</Text>
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
