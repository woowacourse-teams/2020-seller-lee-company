import React, { useLayoutEffect } from "react";
import { StyleSheet, View } from "react-native";
import TeaserImageSlider from "../components/teaser/TeaserImageSlider";
import { useNavigation } from "@react-navigation/native";
import { RootStackParam } from "../types/types";
import { StackNavigationProp } from "@react-navigation/stack";

type TeaserScreenNavigationProp = StackNavigationProp<
  RootStackParam,
  "TeaserScreen"
>;

export default function TeaserScreen() {
  const navigation = useNavigation<TeaserScreenNavigationProp>();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <TeaserImageSlider />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
