import React, { useEffect, useLayoutEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";
import {
  HeaderBackButton,
  StackNavigationProp,
  useHeaderHeight,
} from "@react-navigation/stack";
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from "react-native-popup-menu";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil/dist";
import { Feather } from "@expo/vector-icons";
import ArticleAuthor from "../components/Article/ArticleAuthor";
import ArticleDetail from "../components/ArticleDetail/ArticleDetail";
import ArticleDetailImageSlider from "../components/ArticleDetail/ArticleDetailImageSlider";
import ArticleDeleteModal from "../components/Common/Modal/ArticleDeleteModal";
import TouchablePhoto from "../components/Common/Photo/TouchablePhoto";
import { HomeStackParam, RootStackParam } from "../types/types";
import { articleDetailAPI, articlesAPI } from "../api/api";
import { articleDetailModalState } from "../states/modalState";
import { memberNicknameState } from "../states/memberState";
import {
  articleIsEditingState,
  articleIsModifiedState,
  articleSelectedIdState,
  articleSelectedState,
} from "../states/articleState";
import ArticleDetailBottomNav from "../components/ArticleDetail/ArticleDetailBottomNav";
import theme from "../colors";

type ArticleDetailScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<HomeStackParam, "ArticleDetailScreen">,
  StackNavigationProp<RootStackParam, "HomeStack">
>;

export default function ArticleDetailScreen() {
  const HEADER_HEIGHT = useHeaderHeight();
  const navigation = useNavigation<ArticleDetailScreenNavigationProp>();

  const [articleSelected, setArticleSelected] = useRecoilState(
    articleSelectedState,
  );
  const articleId = useRecoilValue(articleSelectedIdState);
  const memberNickname = useRecoilValue(memberNicknameState);
  const setIsModified = useSetRecoilState(articleIsModifiedState);
  const setIsEditing = useSetRecoilState(articleIsEditingState);
  const setModalVisible = useSetRecoilState(articleDetailModalState);

  const [currentY, setCurrentY] = useState(0);
  const [photos, setPhotos] = useState([]);

  const calculateIconColor = () => {
    const colorValue = 255 - 255 * (currentY / 270);
    return colorValue > 0 ? colorValue : 0;
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "",
      headerTransparent: true,
      headerLeftContainerStyle: {
        aspectRatio: 1,
        justifyContents: "center",
        alignItems: "center",
      },
    });
  }, [navigation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight:
        articleSelected.author.nickname === memberNickname
          ? () => (
              <Menu>
                <MenuTrigger>
                  <Feather name="more-vertical" size={24} color="grey" />
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
          : () => <></>,
      headerRightContainerStyle: {
        aspectRatio: 1,
        justifyContents: "center",
        alignItems: "center",
      },
    });
  }, [articleSelected]);

  useEffect(() => {
    const iconColor = calculateIconColor();

    navigation.setOptions({
      headerBackground: () => <View style={dynamicStyles.headerBackground} />,
      headerLeft: () => (
        <HeaderBackButton
          labelVisible={false}
          onPress={navigation.goBack}
          backImage={() => (
            <Feather
              name="chevron-left"
              size={24}
              color={`rgb(${iconColor},${iconColor},${iconColor})`}
            />
          )}
        />
      ),
    });
  }, [currentY]);

  const dynamicStyles = StyleSheet.create({
    headerBackground: {
      height: HEADER_HEIGHT,
      backgroundColor: `rgba(255,255,255,${currentY / 270})`,
    },
  });

  const getArticle = async () => {
    const { data } = await articleDetailAPI.get(articleId);
    setPhotos(data.photos);
    setArticleSelected({
      ...data,
    });
  };

  useEffect(() => {
    getArticle().then();
  }, [articleId]);

  return (
    <View style={styles.container}>
      <ArticleDeleteModal />
      <ScrollView
        scrollEventThrottle={1}
        style={styles.scrollView}
        onScroll={(event) => setCurrentY(event.nativeEvent.contentOffset.y)}
        bounces={false}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.imageSliderContainer}>
          {photos.length === 1 ? (
            <TouchablePhoto photo={photos[0]} key={photos[0]} />
          ) : (
            <ArticleDetailImageSlider photos={photos} />
          )}
        </View>
        <View style={styles.articleContentContainer}>
          <View style={styles.articleAuthorContainer}>
            <ArticleAuthor />
          </View>
          <View style={styles.articleDetailContainer}>
            <ArticleDetail />
          </View>
        </View>
      </ScrollView>
      <View style={styles.bottomTab}>
        <ArticleDetailBottomNav />
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
    // flex: 1,
  },
  scrollViewContentContainer: {},
  imageSliderContainer: {
    aspectRatio: 1,
  },
  articleContentContainer: {
    backgroundColor: "white",
    marginTop: -30,
    paddingHorizontal: 30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  articleAuthorContainer: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: theme.border,
  },
  articleDetailContainer: {
    paddingVertical: 10,
  },
  bottomTab: {
    justifyContent: "center",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: theme.border,
    paddingHorizontal: 30,
    paddingVertical: 10,
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
