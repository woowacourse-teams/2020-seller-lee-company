/**
 * @author kouz95
 */

import React from "react";
import { StyleSheet, View, Text } from "react-native";

export default function ArticleContentsFormScreen() {
  return (
    <View style={styles.container}>
      <Text>내용 입력</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
