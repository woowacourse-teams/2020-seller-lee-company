import React, { useRef, useState } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";

interface FavoriteProp {
  favoriteCount: number;
}

export default function Favorite({ favoriteCount }: FavoriteProp) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [favorite, setFavorite] = useState(favoriteCount);
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

  const toggleFavorite = () => {
    const unmarkFavorite = () => {
      setIsFavorite(false);
      setFavorite(favorite - 1);
    };

    const markFavorite = () => {
      setIsFavorite(true);
      setFavorite(favorite + 1);
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
        onPress={toggleFavorite}
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
        x {favorite}
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
