import React from "react";
import { StyleSheet, Text } from "react-native";
import { useRecoilValue } from "recoil/dist";
import { articleSelectedState } from "../../../states/articleState";

export default function FavoriteCountAndHit() {
  const { favoriteCount } = useRecoilValue(articleSelectedState);
  return <Text style={styles.text}>찜 {favoriteCount}</Text>;
}

const styles = StyleSheet.create({
  text: {
    fontSize: 15,
    color: "#888888",
  },
});
