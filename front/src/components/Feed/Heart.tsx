/**
 * @author joesph415
 */

import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useRecoilState } from "recoil/dist";
import { favoriteState, isFavoriteState } from "../../states/heartState";

export default function Heart() {
  const [isFavorite, setIsFavorite] = useRecoilState(isFavoriteState);
  const [favorite, setFavorite] = useRecoilState(favoriteState);
  const AnimateIcon = Animated.createAnimatedComponent(AntDesign);

  const springValue = useRef(new Animated.Value(1)).current;

  const checkFavorite = () => {
    if (isFavorite) {
      setIsFavorite(false);
      setFavorite(favorite - 1);
    } else {
      setIsFavorite(true);
      setFavorite(favorite + 1);
    }
  };

  useEffect(() => {
    const fulfillHeartAnimate = () => {
      springValue.setValue(0.33);
      Animated.timing(springValue, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }).start();
    };

    fulfillHeartAnimate();
  }, [isFavorite, springValue]);

  return (
    <View style={styles.detailsHeartContainer}>
      <AnimateIcon
        name={isFavorite ? "heart" : "hearto"}
        size={23}
        color={isFavorite ? "red" : "black"}
        onPress={checkFavorite}
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
