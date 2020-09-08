import React from "react";
import PhotoBox from "./PhotoBox";
import { StyleSheet, TouchableOpacity } from "react-native";
import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { HomeStackParam, RootStackParam } from "../../../types/types";
import { StackNavigationProp } from "@react-navigation/stack";

type TouchablePhotoNavigationProp = CompositeNavigationProp<
  StackNavigationProp<HomeStackParam, "ArticleDetailScreen">,
  StackNavigationProp<RootStackParam, "HomeStack">
>;

interface TouchablePhotoProps {
  photo: string;
}

export default function TouchablePhoto({ photo }: TouchablePhotoProps) {
  const navigation = useNavigation<TouchablePhotoNavigationProp>();

  return (
    <TouchableOpacity
      activeOpacity={1}
      style={styles.container}
      key={photo}
      onPress={() => navigation.navigate("ArticleDetailPhotoViewScreen")}
    >
      <PhotoBox photo={photo} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
