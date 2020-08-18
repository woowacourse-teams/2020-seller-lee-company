import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface ArticleCardAdditionalProps {
  price: number;
  favoriteCount: number;
}

export default function ArticleCardAdditional({
  price,
  favoriteCount,
}: ArticleCardAdditionalProps) {
  return (
    <View style={styles.pieceAndAdditionalContainer}>
      <Text style={styles.price}>{price}원</Text>
      <View style={styles.additionalContainer}>
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
