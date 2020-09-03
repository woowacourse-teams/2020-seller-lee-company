import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  Keyboard,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { HeaderBackButton, StackNavigationProp } from "@react-navigation/stack";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Feather } from "@expo/vector-icons";
import { useRecoilState, useSetRecoilState } from "recoil/dist";
import ArticleFormTitle from "../components/Article/ArticleFormTitle";
import ArticleFormPrice from "../components/Article/ArticleFormPrice";
import ArticleFormScreenModal from "../components/Article/ArticleFormScreenModal";
import Photo from "../components/Common/Photo/Photo";
import Tag from "../components/Common/Tag/Tag";
import {
  articleContentsState,
  articleFormExitState,
  articleIsEditingState,
  articleIsModifiedState,
  articleModalActivationState,
  articlePhotosState,
  articlePriceState,
  articleSelectedCategoryState,
  articleSelectedState,
  articleTitleState,
} from "../states/articleState";
import { tagsState } from "../states/TagState";
import { Article, HomeStackParam, RootStackParam } from "../types/types";
import theme from "../colors";
import { articlesAPI } from "../api/api";
import ArticleFormCategorySelect from "../components/Article/ArticleFormCategorySelect";
import ArticleFormContents from "../components/Article/ArticleFormContents";
import { defaultArticle } from "../data/defaultArticle";

type ArticleFormScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<HomeStackParam, "ArticleFormScreen">,
  StackNavigationProp<RootStackParam, "HomeStack">
>;

export default function ArticleFormScreen() {
  const navigation = useNavigation<ArticleFormScreenNavigationProp>();

  const [article, setArticle] = useState<Article>(defaultArticle);
  const [originArticle, setOriginArticle] = useState<Article>();

  const [editingArticle, setEditingArticle] = useRecoilState(
    articleSelectedState,
  );
  const [exitForm, setExitForm] = useRecoilState(articleFormExitState);
  const [photos, setPhotos] = useRecoilState(articlePhotosState);
  const [title, setTitle] = useRecoilState(articleTitleState);
  const [selectedCategory, setSelectedCategory] = useRecoilState(
    articleSelectedCategoryState,
  );
  const [price, setPrice] = useRecoilState(articlePriceState);
  const [contents, setContents] = useRecoilState(articleContentsState);
  const [tags, setTags] = useRecoilState(tagsState);
  const [isEditing, setIsEditing] = useRecoilState(articleIsEditingState);

  const setArticleModalState = useSetRecoilState(articleModalActivationState);
  const setIsModified = useSetRecoilState(articleIsModifiedState);

  // const confirmToBackAction = () => {
  //   if (isDirty()) {
  //     setArticleModalState(true);
  //     return true;
  //   }
  //   resetForm();
  //   return false;
  // };
  //
  // const backHandler = BackHandler.addEventListener(
  //   "hardwareBackPress",
  //   confirmToBackAction,
  // );
  const resetForm = () => {
    setIsEditing(false);
    setForm(defaultArticle);
    setOriginArticle(defaultArticle);
  };

  const isDirty = () => {
    if (isEditing) {
      return (
        photos.length !== originArticle?.photos.length ||
        title !== originArticle.title ||
        price !== originArticle.price ||
        contents !== originArticle.contents ||
        selectedCategory !== originArticle.categoryName ||
        tags.length !== originArticle.tags.length
      );
    }
    return (
      photos.length !== 0 ||
      title !== "" ||
      price !== 0 ||
      contents !== "" ||
      selectedCategory !== "" ||
      tags.length !== 0
    );
  };

  const incompleteCriticalItems = () => {
    return (
      photos.length === 0 ||
      title === "" ||
      price === 0 ||
      contents === "" ||
      selectedCategory === "" ||
      tags.length === 0
    );
  };

  const confirmToLeave = () => {
    setExitForm(false);

    if (isDirty()) {
      setArticleModalState(true);
      return;
    }
    resetAndBack();
  };

  const resetAndBack = () => {
    resetForm();
    navigation.goBack();
  };

  useEffect(() => {
    if (exitForm) {
      confirmToLeave();
    }
  }, [exitForm]);

  const onSubmit = async () => {
    const data = {
      title,
      price,
      category: selectedCategory,
      contents,
      tags,
      photos,
    };
    isEditing
      ? await articlesAPI.put(article.id, data).then(() => {
          setEditingArticle({
            ...editingArticle,
            title: data.title,
            price: data.price,
            categoryName: data.category,
            contents: data.contents,
            tags: data.tags,
            photos: data.photos,
          });
        })
      : await articlesAPI.post(data);

    setIsModified(true);
    resetAndBack();
  };

  const setForm = (target: Article) => {
    setArticle(target);
    setPhotos(target.photos);
    setTitle(target.title);
    setSelectedCategory(target.categoryName);
    setPrice(target.price);
    setContents(target.contents);
    setTags(target.tags);
  };

  useLayoutEffect(() => {
    setExitForm(false);
    navigation.setOptions({
      title: isEditing ? "게시글 수정" : "게시글 작성",
      headerTitleAlign: "left",
      headerShown: true,
      headerLeft: () => (
        <HeaderBackButton
          labelVisible={false}
          onPress={() => setExitForm(true)}
          backImage={() => (
            <Feather name="chevron-left" size={24} color="black" />
          )}
        />
      ),
      headerLeftContainerStyle: {
        alignItems: "center",
        justifyContents: "center",
        aspectRatio: 1,
      },
    });
  }, [navigation]);

  useEffect(() => {
    if (isEditing) {
      setForm(editingArticle);
      setOriginArticle(editingArticle);
    }
  }, [isEditing, editingArticle]);

  // useEffect(() => backHandler.remove(), []);

  const dynamicStyles = StyleSheet.create({
    priceCurrencyUnit: {
      fontSize: 18,
      color: price === 0 ? "lightgrey" : "black",
    },
    createButtonContainer: {
      backgroundColor: incompleteCriticalItems() ? "grey" : theme.primary,
      aspectRatio: 6,
      justifyContent: "center",
      alignItems: "center",
      borderTopColor: theme.border,
      borderTopWidth: 1,
    },
  });

  return (
    <View style={styles.container}>
      <ArticleFormScreenModal resetCreateScreen={resetForm} />
      <KeyboardAwareScrollView
        contentContainerStyle={styles.keyboardAwareScrollView}
        enableOnAndroid={true}
        enableAutomaticScroll={true}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.contentsContainer}>
          <View style={styles.photoContainer}>
            <Photo />
          </View>
          <TouchableWithoutFeedback
            onPress={Keyboard.dismiss}
            accessible={false}
          >
            <View style={styles.touchableWithoutFeedbackContainer}>
              <View style={styles.titleFormContainer}>
                <ArticleFormTitle />
              </View>
              <View style={styles.selectCategoryContainer}>
                <ArticleFormCategorySelect isEditing={isEditing} />
              </View>
              <View style={styles.priceFormContainer}>
                <Text style={dynamicStyles.priceCurrencyUnit}>₩ </Text>
                <ArticleFormPrice />
              </View>
              <View style={styles.contentsFormContainer}>
                <ArticleFormContents />
              </View>
              <View style={styles.tagFormContainer}>
                <Tag />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <TouchableOpacity
          style={dynamicStyles.createButtonContainer}
          onPress={onSubmit}
        >
          <Text style={styles.submitText}>완료</Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  keyboardAwareScrollView: {
    flexGrow: 1,
    flexShrink: 0,
  },
  contentsContainer: {
    paddingHorizontal: 20,
  },
  photoContainer: {
    aspectRatio: 3.5,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 5,
  },
  touchableWithoutFeedbackContainer: {},
  titleFormContainer: {
    aspectRatio: 6,
    justifyContent: "center",
    alignItems: "flex-start",
    borderTopColor: theme.border,
    borderTopWidth: 1,
  },
  selectCategoryContainer: {
    aspectRatio: 6,
    justifyContent: "center",
    borderTopColor: theme.border,
    borderTopWidth: 1,
  },
  priceFormContainer: {
    aspectRatio: 6,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    borderTopColor: theme.border,
    borderTopWidth: 1,
  },
  contentsFormContainer: {
    aspectRatio: 1.2,
    flexDirection: "row",
    flexWrap: "wrap",
    borderTopColor: theme.border,
    borderTopWidth: 1,
  },
  tagFormContainer: {
    aspectRatio: 2,
    paddingVertical: 15,
    borderTopColor: theme.border,
    borderTopWidth: 1,
  },
  submitText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
});
