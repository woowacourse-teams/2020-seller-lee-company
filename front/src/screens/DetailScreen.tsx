/**
 * @author begaonnuri
 */

import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import DetailArticle from "../components/DetailArticle";

export default function DetailScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.image}>
        <Text>.</Text>
      </View>
      <View style={styles.member}>
        <Text>.</Text>
      </View>
      <View style={styles.article}>
        <DetailArticle />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 5,
    backgroundColor: "lightblue",
  },
  member: {
    flex: 1,
    backgroundColor: "lightyellow",
  },
  article: {
    flex: 4,
    backgroundColor: "white",
  },
});
