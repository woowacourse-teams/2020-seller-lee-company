/**
 * @author joseph415
 */

import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface IArticleCardAdditional {
  price: number;
  chatCount: number;
  favoriteCount: number;
}

export default function ArticleCardAdditional({
  price,
  chatCount,
  favoriteCount,
}: IArticleCardAdditional) {
  return (
    <View style={styles.pieceAndAdditionalContainer}>
      <Text style={styles.price}>{price}원</Text>
      <View style={styles.additionalContainer}>
        <View style={styles.chatContainer}>
          <MaterialCommunityIcons name="chat-outline" size={14} color="black" />
          <Text style={styles.additionalText}>{chatCount}</Text>
        </View>
        <View style={styles.favoriteContainer}>
          <MaterialCommunityIcons
            name="heart-outline"
            size={14}
            color="black"
          />
          <Text style={styles.additionalText}>{favoriteCount}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  price: {
    margin: 3,
    fontSize: 14,
    fontWeight: "bold",
  },
  additionalContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  chatContainer: {
    margin: 3,
    alignItems: "center",
    flexDirection: "row",
  },
  additionalText: {
    fontSize: 14,
    marginLeft: 1,
  },
  favoriteContainer: {
    margin: 3,
    alignItems: "center",
    flexDirection: "row",
  },
  pieceAndAdditionalContainer: {
    flex: 1,
    flexDirection: "row",
  },
});
