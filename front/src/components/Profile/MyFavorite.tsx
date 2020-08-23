import React from "react";
import { StyleSheet, View } from "react-native";
import MyFavoriteHeader from "./MyFavoriteHeader";
import MyFavoriteList from "./MyFavoriteList";

export default function MyFavorite() {
  return (
    <View style={styles.container}>
      <MyFavoriteHeader />
      <MyFavoriteList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
