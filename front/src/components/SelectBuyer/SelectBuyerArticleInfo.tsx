import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

interface SelectBuyerArticleInfoProps {
  title: string;
  photo: string;
}

export default function SelectBuyerArticleInfo({
  title,
  photo,
}: SelectBuyerArticleInfoProps) {
  return (
    <>
      <Image style={styles.image} source={{ uri: photo ? photo : undefined }} />
      <View style={styles.textContainer}>
        <Text style={styles.explanation}>거래한 상품</Text>
        <Text style={styles.title}>{title}</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    margin: 25,
    borderRadius: 20,
  },
  textContainer: {
    flex: 4,
    justifyContent: "center",
  },
  explanation: {
    fontSize: 16,
    color: "grey",
    marginBottom: 3,
  },
  title: {
    fontSize: 18,
    marginTop: 3,
  },
});
