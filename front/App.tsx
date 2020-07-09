import React from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import index from "./src/styles/index";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={index.header} />
      <View style={index.contents} />
      <View style={index.footer} />
    </SafeAreaView>
  );
}
