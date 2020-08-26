import React, { useRef, useState } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { favoriteAPI } from "../../../api/api";

interface FavoriteProp {
  articleId: number;
  state: boolean;
  count: number;
}

export default function Favorite({ articleId, state, count }: FavoriteProp) {
  const [favoriteState, setFavoriteState] = useState(state);
  const [favoriteCount, setFavoriteCount] = useState(count);
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
    <View style={styles.detailsHeartContainer}>
      <AnimateIcon
        name={favoriteState ? "heart" : "hearto"}
        size={23}
        color={favoriteState ? "red" : "black"}
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
        x {favoriteCount}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  detailsHeartContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    fontWeight: "bold",
  },
});
