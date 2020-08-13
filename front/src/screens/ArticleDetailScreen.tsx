import React, { useEffect, useLayoutEffect } from "react";
import { Button, ScrollView, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { HeaderBackButton } from "@react-navigation/stack";
import { EvilIcons } from "@expo/vector-icons";
import ArticleDetail from "../components/ArticleDetail/ArticleDetail";
import ArticleDetailFavorite from "../components/ArticleDetail/ArticleDetailFavorite";
import { ArticleDetailNavigationProp } from "../types/types";
import ArticlePrice from "../components/Article/ArticlePrice";
import ArticleDetailChatButton from "../components/ArticleDetail/ArticleDetailChatButton";
import ArticleDetailImageSlider from "../components/ArticleDetail/ArticleDetailImageSlider";
import ArticleAuthor from "../components/Article/ArticleAuthor";
import theme from "../colors";
import { articleDetailAPI } from "../api/api";
import { useRecoilValue, useSetRecoilState } from "recoil/dist";
import {
  articleIsEditingState,
  articleSelectedIdState,
  articleSelectedState,
} from "../states/articleState";

export default function ArticleDetailScreen() {
  const navigation = useNavigation<ArticleDetailNavigationProp>();
  const articleId = useRecoilValue(articleSelectedIdState);
  const setArticleSelected = useSetRecoilState(articleSelectedState);
  const setIsEditing = useSetRecoilState(articleIsEditingState);

  const getArticle = async () => {
    const { data } = await articleDetailAPI.get(articleId);
    console.log(data);
    setArticleSelected(data);
  };

  useEffect(() => {
    getArticle();
  }, [articleId]);

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
          onPress={() => {
            navigation.navigate("ArticleFormScreen");
            setIsEditing(true);
          }}
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
          <ArticleDetailImageSlider />
        </View>
        <View style={styles.articleAuthorContainer}>
          <ArticleAuthor />
        </View>
        <View style={styles.articleDetailContainer}>
          <ArticleDetail />
        </View>
      </ScrollView>
      <View style={styles.bottomTab}>
        <View style={styles.articleDetailFavoriteContainer}>
          <ArticleDetailFavorite />
        </View>
        <ArticlePrice />
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
