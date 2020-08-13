import React from "react";

import { Alert, Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Buyer } from "../../types/types";

export default function BuyerCard({ avatar, nickname }: Buyer) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => Alert.alert("구매자 평가 화면으로 이동")}
    >
      <Image style={styles.image} source={{ uri: avatar }} />
      <Text style={styles.nickname}>{nickname}</Text>
    </TouchableOpacity>
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
