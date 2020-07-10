import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";

export default function ArticleCard() {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={require("../../assets/icon.png")} />
      </View>
      <View style={styles.contentsContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>락앤락 비스프리 반찬통</Text>
        </View>
        <View style={styles.tradeDetailContainer}>
          <View style={styles.tradeTypeContainer}>
            <Text style={styles.tradeType}>잠실4동 / 직거래</Text>
          </View>
          <Text>∙</Text>
          <View style={styles.timeContainer}>
            <Text style={styles.tradeType}>2초 전</Text>
          </View>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>1,500원</Text>
        </View>
        <View style={styles.additionalContainer}>
          <View style={styles.chatContainer}>
            <MaterialCommunityIcons name="chat-outline" size={14} color="red" />
            <Text>10</Text>
          </View>
          <View style={styles.favoriteContainer}>
            <FontAwesome name="heart" size={14} color="red" />
            <Text>3</Text>
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
    // backgroundColor: "red",
    flex: 4.5,
    margin: innerContainerMargin,
  },
  contentsContainer: {
    // backgroundColor: "yellow",
    flex: 10.5,
    margin: innerContainerMargin,
  },
  titleContainer: {
    flexWrap: "wrap",
    alignItems: "flex-start",
    justifyContent: "center",
    // backgroundColor: "blue",
  },
  tradeDetailContainer: {
    flexDirection: "row",
    alignItems: "center",
    // backgroundColor: "green",
  },
  tradeTypeContainer: {
    justifyContent: "center",
    // backgroundColor: "green",
  },
  timeContainer: {
    justifyContent: "center",
    // backgroundColor: "green",
  },
  priceContainer: {
    // backgroundColor: "purple",
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
  favoriteContainer: {
    margin: 3,
    alignItems: "center",
    flexDirection: "row",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    borderRadius: 15,
  },
  title: {
    margin: 3,
    fontSize: 14,
    fontWeight: "bold",
  },
  tradeType: {
    margin: 3,
    fontSize: 10,
  },
  price: {
    margin: 3,
    fontSize: 14,
    fontWeight: "bold",
  },
});
