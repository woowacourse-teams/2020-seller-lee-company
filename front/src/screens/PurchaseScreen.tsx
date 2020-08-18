/**
 * @author lxxjn0
 */

import React, { useEffect, useLayoutEffect } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { HeaderBackButton } from "@react-navigation/stack";
import { EvilIcons } from "@expo/vector-icons";
import PurchaseArticle from "../components/Profile/PurchaseArticle";
import { tradeAPI } from "../api/api";
import { useRecoilState } from "recoil/dist";
import { tradeArticleState } from "../states/articleState";

export default function PurchaseScreen() {
  const navigation = useNavigation();
  const [tradeArticles, setTradeArticles] = useRecoilState(tradeArticleState);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "구매내역",
      headerLeft: () => (
        <HeaderBackButton
          labelVisible={false}
          onPress={navigation.goBack}
          backImage={() => (
            <EvilIcons name="chevron-left" size={35} color="black" />
          )}
        />
      ),
      headerLeftContainerStyle: {
        paddingLeft: 10,
      },
    });
  });

  useEffect(() => {
    getArticles();
  }, []);

  const getArticles = async () => {
    try {
      const { data } = await tradeAPI.get();
      setTradeArticles(data);
    } catch (error) {
      console.log("tradeArticle error");
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={tradeArticles}
        renderItem={({ item }) => (
          <PurchaseArticle
            title={item.title}
            price={item.price}
            createdTime={item.createdTime}
            favoriteCount={7}
            chatCount={2}
            thumbnail={item.thumbnail}
          />
        )}
        keyExtractor={(item, index) => `${index}`}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
