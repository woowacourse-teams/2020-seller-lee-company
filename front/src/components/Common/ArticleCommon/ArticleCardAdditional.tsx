import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { insertComma } from "../../../replacePriceWithComma";
import theme from "../../../colors";

interface ArticleCardAdditionalProps {
  price: number;
  favoriteCount: number;
  favoriteState: boolean;
}

export default function ArticleCardAdditional({
  price,
  favoriteCount,
  favoriteState,
}: ArticleCardAdditionalProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.price}>{insertComma(price.toString())}원</Text>
      <View style={styles.additionalContainer}>
        <View style={styles.favoriteContainer}>
          <AntDesign
            name={favoriteState ? "heart" : "hearto"}
            size={14}
            color={favoriteState ? theme.heart : "black"}
          />
          <Text style={styles.additionalText}>{favoriteCount}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },
  price: {
    fontSize: 15,
    fontWeight: "bold",
    marginTop: 5,
  },
  additionalContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  favoriteContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  additionalText: {
    fontSize: 14,
    marginLeft: 3,
  },
});
