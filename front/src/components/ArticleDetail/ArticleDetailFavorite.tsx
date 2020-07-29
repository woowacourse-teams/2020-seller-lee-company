/**
 * @author joseph415
 */

import React, { useEffect, useRef, useState } from "react";
import { Animated, StyleSheet, View } from "react-native";
import axios from "axios";
import { AntDesign } from "@expo/vector-icons";
import { ArticleDetailFavoriteProp } from "../../types/types";

export default function ArticleDetailFavorite({
  article_id,
}: ArticleDetailFavoriteProp) {
  const member_id = 1;
  const [favoriteState, setFavorite] = useState(false);
  const AnimateIcon = Animated.createAnimatedComponent(AntDesign);

  const springValue = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    axios.get("/favorite/" + member_id + "/" + article_id).then((res) => {
      setFavorite(res.data.favorite);
    });
  }, [article_id]);

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
      axios.delete("/favorite/" + member_id + "/" + article_id).then((res) => {
        if (res.statusText === "OK") {
          console.log("성공");
        }
      });
    };

    const markFavorite = () => {
      setFavorite(true);
      axios.post("/favorite/" + member_id + "/" + article_id).then((res) => {
        if (res.statusText === "OK") {
          console.log("성공");
        }
      });
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
