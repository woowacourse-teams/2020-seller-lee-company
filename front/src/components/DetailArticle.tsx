/**
 * @author begaonnuri
 */

import React from "react";
import { StyleSheet, View } from "react-native";
import DetailTitle from "./DetailTitle";
import DetailSubTitle from "./DetailSubTitle";
import DetailContents from "./DetailContents";

export default function DetailArticle() {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <DetailTitle />
      </View>
      <View style={styles.subTitleContainer}>
        <DetailSubTitle />
      </View>
      <View style={styles.contentsContainer}>
        <DetailContents />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  titleContainer: {
    paddingHorizontal: 1,
    marginTop: 10,
  },
  subTitleContainer: {
    marginVertical: 15,
  },
  contentsContainer: {
    marginTop: 5,
  },
});
