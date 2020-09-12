import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import ArticleDetailFavorite from "./ArticleDetailFavorite";
import { useRecoilValue } from "recoil";
import { articleSelectedState } from "../../states/articleState";
import { insertComma } from "../../replacePriceWithComma";
import theme from "../../colors";
import { memberNicknameState } from "../../states/memberState";
import { chatRoomAPI } from "../../api/api";

export default function ArticleDetailBottomNav() {
  const { author, price } = useRecoilValue(articleSelectedState);
  const memberNickname = useRecoilValue(memberNicknameState);

  const createChat = (author: any) => {
    chatRoomAPI.create(author.nickname);
  };

  return (
    <View style={styles.container}>
      <View style={styles.favoriteContainer}>
        <ArticleDetailFavorite />
      </View>
      <View style={styles.priceContainer}>
        {memberNickname !== author.nickname ? (
          <Button title={"채팅하기"} onPress={() => createChat(author)} />
        ) : undefined}
        <Text style={styles.price}>{`${insertComma(price.toString())}원`}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    aspectRatio: 7,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  favoriteContainer: {
    justifyContent: "center",
    alignItems: "center",
    borderRightWidth: 1,
    borderRightColor: theme.border,
    paddingRight: 30,
  },
  priceContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  price: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: theme.others,
  },
});
