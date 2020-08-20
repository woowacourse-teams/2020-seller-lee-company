import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AuthorScoreType } from "../../types/types";

interface AuthorScoreProps {
  score: AuthorScoreType;
}

export default function AuthorScore({ score }: AuthorScoreProps) {
  const iconName = `numeric-${score ? score : 0}-circle-outline`;
  const iconColor = () => {
    switch (score) {
      case 0:
      case 1:
      case 2:
      case 3:
        return "red";
      case 4:
      case 5:
      case 6:
        return "orange";
      case 7:
      case 8:
      case 9:
        return "green";
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
