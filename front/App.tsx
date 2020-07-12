import React from "react";
import { Platform, SafeAreaView, StatusBar, StyleSheet } from "react-native";

export default function App() {
  return <SafeAreaView style={styles.safeAreaContainer} />;
}

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
