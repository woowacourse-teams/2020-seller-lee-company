import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { Props } from "../components/CategoryNavigation";

/**
 *
 * @author 터틀, 서브웨이
 */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "yellow",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "black",
    fontSize: 30,
  },
});

export default function CategoryHomeScreen({ navigation }: Props) {
  const selectedCategoryName = "가전 제품";

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Category Screen</Text>
      <Button
        title="move"
        onPress={() =>
          navigation.push("CategoryDetail", { title: selectedCategoryName })
        }
      />
    </View>
  );
}
