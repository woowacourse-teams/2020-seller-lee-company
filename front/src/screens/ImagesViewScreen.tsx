/**
 * @author kouz95
 */

import React from "react";
import { StyleSheet, View } from "react-native";

import ImagesViewSlider from "../components/ImagesViewSlider";
import { StackNavigationProp } from "@react-navigation/stack";
import { ImageSliderParamList } from "../types/types";
import { RouteProp } from "@react-navigation/native";

interface ImagesViewScreenProps {
  navigation: StackNavigationProp<ImageSliderParamList>;
  route: RouteProp<ImageSliderParamList, "ImagesViewScreen">;
}

export default function ImagesViewScreen({
  navigation,
  route,
}: ImagesViewScreenProps) {
  return (
    <View style={styles.container}>
      <ImagesViewSlider images={route.params.images} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
