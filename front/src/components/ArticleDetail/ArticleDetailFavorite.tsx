/**
 * @author joseph415
 */

import React, { useRef, useState } from "react";
import { Animated, StyleSheet, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";

export default function ArticleDetailFavorite() {
  const [favoriteState, setFavorite] = useState(false);
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
      setFavorite(false);
    };

    const markFavorite = () => {
      setFavorite(true);
    };

    if (favoriteState) {
      unmarkFavorite();
    } else {
      markFavorite();
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
