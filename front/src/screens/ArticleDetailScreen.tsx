/**
 * @author joseph415
 */

import React, { useEffect, useLayoutEffect, useState } from "react";
import { Button, ScrollView, StyleSheet, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { HeaderBackButton } from "@react-navigation/stack";
import { EvilIcons } from "@expo/vector-icons";
import ArticleDetail from "../components/ArticleDetail/ArticleDetail";
import ArticleDetailFavorite from "../components/ArticleDetail/ArticleDetailFavorite";
import ArticlePriceAndTradeType from "../components/Article/ArticlePriceAndTradeType";
import ArticleDetailChatButton from "../components/ArticleDetail/ArticleDetailChatButton";
import ArticleDetailImageSlider from "../components/ArticleDetail/ArticleDetailImageSlider";
import {
  AuthorScoreType,
  ArticleDetailNavigationProp,
  ArticleDetailRouteProp,
} from "../types/types";
import ArticleAuthor from "../components/Article/ArticleAuthor";
import theme from "../colors";
import { articleDetailAPI } from "../api/api";

export default function ArticleDetailScreen() {
  const navigation = useNavigation<ArticleDetailNavigationProp>();
  const route = useRoute<ArticleDetailRouteProp>();
  const [articleId, setArticleId] = useState(0);

  const getMockImages = () => {
    return [
      "https://avatars1.githubusercontent.com/u/48052622?s=400&u=a6aefc01e1ed6d8407e868a66227716d1813182b&v=4",
      "https://avatars1.githubusercontent.com/u/48052622?s=400&u=a6aefc01e1ed6d8407e868a66227716d1813182b&v=4",
      "https://avatars1.githubusercontent.com/u/48052622?s=400&u=a6aefc01e1ed6d8407e868a66227716d1813182b&v=4",
    ];
  };

  const articleDetail = async () => {
    try {
      return await articleDetailAPI.get(articleId);
    } catch (error) {
      console.log("showArticle error");
    }
  };

  useEffect(() => {
    setArticleId(route.params.articleId);
  }, [route]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "",
      headerLeft: () => (
        <HeaderBackButton
          labelVisible={false}
          onPress={navigation.goBack}
          backImage={() => (
            <EvilIcons name="chevron-left" size={35} color={"grey"} />
          )}
        />
      ),
      headerLeftContainerStyle: { paddingLeft: 10 },
      headerRight: () => (
        <Button
          title="수정"
          onPress={() =>
            navigation.navigate("ArticleEditScreen", { articleId })
          }
        />
      ),
      headerRightContainerStyle: { paddingRight: 15 },
    });
  });

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        bounces={false}
        contentContainerStyle={styles.scrollViewContentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.imageSliderContainer}>
          <ArticleDetailImageSlider photos={getMockImages()} />
        </View>
        <View style={styles.articleAuthorContainer}>
          <ArticleAuthor
            name={"스티치"}
            score={7 as AuthorScoreType}
            avatar={{
              uri:
                "https://avatars1.githubusercontent.com/u/48052622?s=400&u=a6aefc01e1ed6d8407e868a66227716d1813182b&v=4",
            }}
          />
        </View>
        <View style={styles.articleDetailContainer}>
          <ArticleDetail />
        </View>
      </ScrollView>
      <View style={styles.bottomTab}>
        <View style={styles.articleDetailFavoriteContainer}>
          <ArticleDetailFavorite articleId={articleId} />
        </View>
        <ArticlePriceAndTradeType articleId={articleId} />
        <View style={styles.chatButtonContainer}>
          <ArticleDetailChatButton />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollView: {
    flex: 1,
    marginHorizontal: 15,
  },
  scrollViewContentContainer: {},
  imageSliderContainer: {
    aspectRatio: 1,
    borderRadius: 5,
  },
  articleAuthorContainer: {
    flex: 1,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eaeaea",
  },
  articleDetailContainer: {
    paddingVertical: 10,
  },
  bottomTab: {
    flexDirection: "row",
    aspectRatio: 5,
    paddingHorizontal: 15,
    paddingBottom: 10,
    borderTopWidth: 1,
    borderTopColor: "#eaeaea",
    backgroundColor: theme.tertiary,
  },
  chatButtonContainer: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  articleDetailFavoriteContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
});
