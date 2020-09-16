import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import ArticleDetailFavorite from "./ArticleDetailFavorite";
import { useRecoilValue } from "recoil";
import { articleSelectedState } from "../../states/articleState";
import { insertComma } from "../../replacePriceWithComma";
import theme from "../../colors";
import { memberNicknameState } from "../../states/memberState";
import { chatRoomAPI } from "../../api/api";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { HomeStackParam } from "../../types/types";
import { useSetRecoilState } from "recoil/dist";
import { chatRoomState } from "../../states/chatRoomState";

export default function ArticleDetailBottomNav() {
  const navigation = useNavigation<
    StackNavigationProp<HomeStackParam, "ArticleDetailScreen">
  >();

  const { id, title, tradeState, author, price, photos } = useRecoilValue(
    articleSelectedState,
  );
  const memberNickname = useRecoilValue(memberNicknameState);
  const setChatRoom = useSetRecoilState(chatRoomState);

  const createChat = async (author: any) => {
    const {
      headers: { location },
    } = await chatRoomAPI.create({
      articleId: id,
      sellerId: author.id,
    });
    const locations = location.split("/");
    const roomId = locations[locations.length - 1];
    setChatRoom({
      id: roomId,
      articleInfo: {
        id,
        price: price,
        thumbnail: photos[0],
        title: title,
        tradeState: tradeState,
      },
      opponent: {
        avatar: author.avatar,
        id: author.id,
        nickname: author.nickname,
      },
    });
    navigation.navigate("ChatScreen");
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
