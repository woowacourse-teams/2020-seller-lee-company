import React from "react";
import PhotoBox from "./PhotoBox";
import { StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ArticleDetailNavigationProp } from "../../../types/types";

interface TouchablePhotoProps {
  photo: string;
}

export default function TouchablePhoto({ photo }: TouchablePhotoProps) {
  const navigation = useNavigation<ArticleDetailNavigationProp>();
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={styles.buttonOnImage}
      key={photo}
      onPress={() => navigation.navigate("ArticleDetailImageViewScreen")}
    >
      <PhotoBox photoURI={photo} marginBottom={0} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonOnImage: {
    flex: 1,
  },
});
