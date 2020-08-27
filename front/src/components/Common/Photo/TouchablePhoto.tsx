import React from "react";
import PhotoBox from "./PhotoBox";
import { StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FeedStackArticleDetailScreenProp } from "../../../types/types";

interface TouchablePhotoProps {
  photo: string;
}

export default function TouchablePhoto({ photo }: TouchablePhotoProps) {
  const navigation = useNavigation<FeedStackArticleDetailScreenProp>();

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
