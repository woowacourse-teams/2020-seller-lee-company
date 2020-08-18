import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  BackHandler,
  Button,
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { HeaderBackButton } from "@react-navigation/stack";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { EvilIcons } from "@expo/vector-icons";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil/dist";
import ArticleTitleForm from "../components/Article/ArticleTitleForm";
import ArticlePriceForm from "../components/Article/ArticlePriceForm";
import ArticleFormScreenModal from "../components/Article/ArticleFormScreenModal";
import Photo from "../components/Common/Photo/Photo";
import Tag from "../components/Common/Tag/Tag";
import {
  articleContentsState,
  articleIsEditingState,
  articleModalActivationState,
  articlePhotosState,
  articlePriceState,
  articleSelectedCategoryState,
  articleSelectedState,
  articleTitleState,
} from "../states/articleState";
import { tagsState } from "../states/TagState";
import { Article, ArticleCreateScreenNavigationProp } from "../types/types";
import theme from "../colors";
import { articlesAPI } from "../api/api";
import ArticleFormCategorySelect from "../components/Article/ArticleFormCategorySelect";
import ArticleContentsForm from "../components/Article/ArticleContentsForm";
import { defaultArticle } from "../data/defaultArticle";
import { memberIdState } from "../states/loginState";

export default function ArticleCreateScreen() {
  const navigation = useNavigation<ArticleCreateScreenNavigationProp>();
  const [article, setArticle] = useState<Article>(defaultArticle);
  const editingArticle = useRecoilValue(articleSelectedState);
  const [isEditing, setIsEditing] = useRecoilState(articleIsEditingState);

  const memberId = useRecoilValue(memberIdState);
  const [photos, setPhotos] = useRecoilState(articlePhotosState);
  const [title, setTitle] = useRecoilState(articleTitleState);
  const [selectedCategory, setSelectedCategory] = useRecoilState(
    articleSelectedCategoryState,
  );
  const [price, setPrice] = useRecoilState(articlePriceState);
  const [contents, setContents] = useRecoilState(articleContentsState);
  const [tags, setTags] = useRecoilState(tagsState);
  const setArticleModalState = useSetRecoilState(articleModalActivationState);
  const [originArticle, setOriginArticle] = useState<Article>();

  const confirmToBackAction = () => {
    if (isDirty()) {
      setArticleModalState(true);
      return true;
    }
    resetForm();
    return false;
  };

  const backHandler = BackHandler.addEventListener(
    "hardwareBackPress",
    confirmToBackAction,
  );

  const resetForm = () => setIsEditing(false);

  const isDirty = () => {
    return (
      article.photos.length !== originArticle?.photos.length ||
      article.title !== originArticle.title ||
      article.price !== originArticle.price ||
      article.contents !== originArticle.contents ||
      article.categoryName !== originArticle.categoryName ||
      article.tags.length !== originArticle.tags.length
    );
  };

  const incompleteCriticalItems = () => {
    return (
      photos.length === 0 ||
      title === "" ||
      price === 0 ||
      contents === "" ||
      selectedCategory === ""
    );
  };

  const confirmToLeave = () => {
    if (isDirty()) {
      setArticleModalState(true);
      return;
    }
    resetForm();
    navigation.goBack();
  };

  const dynamicStyles = StyleSheet.create({
    priceCurrencyUnit: {
      fontSize: 18,
      color: price === 0 ? "lightgrey" : "black",
    },
    createButtonContainer: {
      backgroundColor: incompleteCriticalItems() ? "grey" : theme.primary,
      flex: 3,
      justifyContent: "center",
      alignItems: "center",
      borderTopColor: "#eaeaea",
      borderTopWidth: 1,
    },
  });

  const onSubmit = async () => {
    const data = {
      title,
      price,
      category: selectedCategory,
      contents,
      tags,
      photos,
      authorId: memberId,
    };

    isEditing
      ? await articlesAPI.put(article.id, data)
      : await articlesAPI.post(data);
    resetForm();
    navigation.goBack();
  };

  const setForm = (article: Article) => {
    setArticle(article);
    setPhotos(article.photos);
    setTitle(article.title);
    setSelectedCategory(article.categoryName);
    setPrice(article.price);
    setContents(article.contents);
    setTags(article.tags);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "수정하기" : "글쓰기",
      headerLeft: () => (
        <HeaderBackButton
          labelVisible={false}
          onPress={confirmToLeave}
          backImage={() => (
            <EvilIcons name="chevron-left" size={35} color="black" />
          )}
        />
      ),
      headerLeftContainerStyle: { paddingLeft: 10 },
    });
  });

  useEffect(() => {
    if (isEditing) {
      setForm(editingArticle);
      setOriginArticle(editingArticle);
    } else {
      setForm(defaultArticle);
      setOriginArticle(defaultArticle);
    }
  }, [isEditing]);

  useEffect(() => backHandler.remove(), []);

  return (
    <KeyboardAwareScrollView
      enableOnAndroid
      contentContainerStyle={styles.container}
    >
      <ArticleFormScreenModal resetCreateScreen={resetForm} />
      <View style={styles.contentsContainer}>
        <View style={styles.photoContainer}>
          <Photo />
        </View>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={styles.touchableWithoutFeedbackContainer}>
            <View style={styles.titleFormContainer}>
              <ArticleTitleForm />
            </View>
            <View style={styles.selectCategoryContainer}>
              <ArticleFormCategorySelect isEditing={isEditing} />
            </View>
            <View style={styles.priceFormContainer}>
              <Text style={dynamicStyles.priceCurrencyUnit}>₩ </Text>
              <ArticlePriceForm />
            </View>
            <View style={styles.contentsFormContainer}>
              <ArticleContentsForm />
            </View>
            <View style={styles.tagFormContainer}>
              <View style={styles.tagForm}>
                <Tag />
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
      <View style={dynamicStyles.createButtonContainer}>
        <Button
          title={"완료"}
          color={"white"}
          disabled={incompleteCriticalItems()}
          onPress={onSubmit}
        />
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  contentsContainer: {
    flex: 32.5,
    paddingHorizontal: 20,
  },
  photoContainer: {
    flex: 4,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  touchableWithoutFeedbackContainer: {
    flex: 28.5,
  },
  titleFormContainer: {
    flex: 3,
    justifyContent: "center",
    alignItems: "flex-start",
    borderTopColor: "#eaeaea",
    borderTopWidth: 1,
  },
  selectCategoryContainer: {
    flex: 3,
    justifyContent: "center",
    borderTopColor: "#eaeaea",
    borderTopWidth: 1,
  },
  priceFormContainer: {
    flex: 3,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    borderTopColor: "#eaeaea",
    borderTopWidth: 1,
  },
  contentsFormContainer: {
    flex: 12.5,
    borderTopColor: "#eaeaea",
    borderTopWidth: 1,
  },
  tagFormContainer: {
    borderTopColor: "#eaeaea",
    borderTopWidth: 1,
  },
  tagForm: {
    marginVertical: 15,
  },
});
