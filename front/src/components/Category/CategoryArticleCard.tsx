import React from "react";
import { Image, ImageProps, StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import calculateDiffTime from "../../calculateDiffTime";

type ArticleAdditional = {
  favoriteCount: number;
  chatCount: number;
};

export interface CategoryArticleCardProps {
  title: string;
  price: number;
  createdAt: string;
  additional: ArticleAdditional;
  thumbnail: ImageProps;
}

export default function CategoryArticleCard({
  title,
  price,
  createdAt,
  additional,
  thumbnail,
}: CategoryArticleCardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={thumbnail} />
      </View>
      <View style={styles.contentsContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
        </View>
        <View style={styles.createTimeContainer}>
          <View style={styles.timeContainer}>
            <Text style={styles.createdTime}>
              {calculateDiffTime(createdAt)}
            </Text>
          </View>
        </View>
        <Text style={styles.price}>{price}원</Text>
        <View style={styles.additionalContainer}>
          <View style={styles.chatContainer}>
            <MaterialCommunityIcons
              name="chat-outline"
              size={14}
              color="black"
            />
            <Text style={styles.additionalText}>{additional.chatCount}</Text>
          </View>
          <View style={styles.favoriteContainer}>
            <MaterialCommunityIcons
              name="heart-outline"
              size={14}
              color="black"
            />
            <Text style={styles.additionalText}>
              {additional.favoriteCount}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const innerContainerMargin = 13;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    aspectRatio: 13 / 4,
  },
  imageContainer: {
    flex: 4.5,
    margin: innerContainerMargin,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    borderRadius: 15,
  },
  contentsContainer: {
    flex: 10.5,
    margin: innerContainerMargin,
  },
  titleContainer: {
    flexWrap: "wrap",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  title: {
    margin: 3,
    fontSize: 14,
    fontWeight: "bold",
  },
  createTimeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  createdTime: {
    margin: 3,
    fontSize: 10,
  },
  timeContainer: {
    justifyContent: "center",
  },
  price: {
    margin: 3,
    fontSize: 14,
    fontWeight: "bold",
  },
  additionalContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  chatContainer: {
    margin: 3,
    alignItems: "center",
    flexDirection: "row",
  },
  additionalText: {
    fontSize: 14,
    marginLeft: 1,
  },
  favoriteContainer: {
    margin: 3,
    alignItems: "center",
    flexDirection: "row",
  },
});
