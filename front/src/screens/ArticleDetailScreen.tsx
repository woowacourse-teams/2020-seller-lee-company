import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { HeaderBackButton } from "@react-navigation/stack";
import { EvilIcons, Ionicons } from "@expo/vector-icons";
import ArticleDetail from "../components/ArticleDetail/ArticleDetail";
import ArticleDetailFavorite from "../components/ArticleDetail/ArticleDetailFavorite";
import {
  ArticleDetailNavigationProp,
  ArticleNavigationParamList,
} from "../types/types";
import ArticlePrice from "../components/Article/ArticlePrice";
import ArticleDetailChatButton from "../components/ArticleDetail/ArticleDetailChatButton";
import ArticleDetailImageSlider from "../components/ArticleDetail/ArticleDetailImageSlider";
import ArticleAuthor from "../components/Article/ArticleAuthor";
import theme from "../colors";
import { articleDetailAPI, articlesAPI } from "../api/api";
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from "react-native-popup-menu";

import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil/dist";
import {
  articleIsEditingState,
  articleIsModifiedState,
  articleSelectedIdState,
  articleSelectedState,
} from "../states/articleState";
import { articleDetailModalState } from "../states/modalState";
import ArticleDeleteModal from "../components/Common/Modal/ArticleDeleteModal";

import TouchablePhoto from "../components/Common/Photo/TouchablePhoto";
import { memberNicknameState } from "../states/memberState";

type ArticleDetailRouteProp = RouteProp<
  ArticleNavigationParamList,
  "ArticleDetailScreen"
>;

export default function ArticleDetailScreen() {
  const [currentY, setCurrentY] = useState(0);
  const setModalVisible = useSetRecoilState(articleDetailModalState);
  const navigation = useNavigation<ArticleDetailNavigationProp>();
  const articleId = useRecoilValue(articleSelectedIdState);
  const [articleSelected, setArticleSelected] = useRecoilState(
    articleSelectedState,
  );
  const setIsEditing = useSetRecoilState(articleIsEditingState);
  const memberNickname = useRecoilValue(memberNicknameState);
  const [photos, setPhotos] = useState([]);
  const setIsModified = useSetRecoilState(articleIsModifiedState);

  useEffect(() => {
    navigation.setOptions({
      title: "",
      headerTransparent: true,
      headerLeft: () => (
        <HeaderBackButton
          labelVisible={false}
          onPress={navigation.goBack}
          backImage={() => (
            <EvilIcons name="chevron-left" size={35} color={"grey"} />
          )}
        />
      ),
      headerRight:
        articleSelected.author.nickname === memberNickname
          ? () => (
              <Menu>
                <MenuTrigger>
                  <Ionicons name="md-more" size={26} color={"grey"} />
                </MenuTrigger>
                <MenuOptions
                  optionsContainerStyle={styles.menuOptionsContainer}
                  customStyles={{ optionText: styles.menuCustomText }}
                >
                  <MenuOption
                    onSelect={() => {
                      navigation.navigate("ArticleFormScreen");
                      setIsEditing(true);
                    }}
                    text={"수정"}
                  />
                  <MenuOption
                    onSelect={() =>
                      articlesAPI.delete(articleId).then(() => {
                        setIsModified(true);
                        setModalVisible(true);
                      })
                    }
                    text={"삭제"}
                  />
                </MenuOptions>
              </Menu>
            )
          : undefined,
      headerLeftContainerStyle: { paddingLeft: 10 },
      headerRightContainerStyle: { paddingRight: 15 },
    });
  }, [articleSelected]);

  useEffect(() => {
    navigation.setOptions({
      headerBackground: () => <View style={dynamicStyles.headerBackground} />,
    });
  }, [currentY]);

  const dynamicStyles = StyleSheet.create({
    headerBackground: {
      height: 90,
      backgroundColor: `rgba(255,255,255,${currentY / 70})`,
    },
  });

  const getArticle = async () => {
    const { data } = await articleDetailAPI.get(articleId);
    setPhotos(data.photos);
    setArticleSelected(data);
  };

  useEffect(() => {
    getArticle();
  }, [articleId]);

  return (
    <View style={styles.container}>
      <ArticleDeleteModal />
      <ScrollView
        style={styles.scrollView}
        bounces={false}
        contentContainerStyle={styles.scrollViewContentContainer}
        showsVerticalScrollIndicator={false}
        onScroll={(event) => setCurrentY(event.nativeEvent.contentOffset.y)}
        scrollEventThrottle={1}
      >
        <View style={styles.imageSliderContainer}>
          {photos.length === 1 ? (
            <TouchablePhoto photo={photos[0]} />
          ) : (
            <ArticleDetailImageSlider photos={photos} />
          )}
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
  menuOptionsContainer: {
    width: 80,
  },
  menuCustomText: {
    textAlign: "center",
    margin: 10,
  },
});
