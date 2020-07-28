/**
 * @author begaonnuri
 */

import React from "react";
import { StyleSheet, Text } from "react-native";
import { FavoriteCountAndHitProps } from "../types/types";

export default function FavoriteCountAndHit({
  favoriteCount,
  hit,
}: FavoriteCountAndHitProps) {
  return (
    <Text style={styles.text}>
      찜 {favoriteCount} | 조회 {hit}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 15,
    color: "#888888",
  },
});
