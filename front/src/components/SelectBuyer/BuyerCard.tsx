/**
 * @author kouz95
 */

import React from "react";

import { Image, StyleSheet, Text, View } from "react-native";
import { Buyer } from "../../types/types";

export default function BuyerCard({ avatar, nickname }: Buyer) {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: avatar }}/>
      <Text style={styles.nickname}>{nickname}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flexDirection: "row",
    aspectRatio: 16 / 3,
    borderBottomWidth: 0.3,
    borderBottomColor: "rgb(191,191,191)",
  },
  image: {
    flex: 1,
    borderRadius: 25,
    margin: 15,
  },
  nickname: {
    fontSize: 18,
    fontWeight: "500",
    flex: 6.5,
    alignSelf: "center",
  },
});
