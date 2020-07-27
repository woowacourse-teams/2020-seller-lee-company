import React from "react";
import { AuthorScoreProps } from "../types/types";
import { StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function AuthorScore({ score }: AuthorScoreProps) {
  const iconName = `numeric-${score}-circle-outline`;
  const iconColor = () => {
    switch (score) {
      case 0:
      case 1:
      case 2:
        return "#dc471a";
      case 3:
      case 4:
      case 5:
        return "#e48635";
      case 6:
      case 7:
        return "#4bc831";
      case 8:
      case 9:
        return "#66d5f8";
      default:
        return "white";
    }
  };

  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name={iconName} size={36} color={iconColor()} />
      <Text style={styles.scoreText}>친절 점수</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scoreText: {
    fontSize: 11,
    color: "grey",
  },
});
