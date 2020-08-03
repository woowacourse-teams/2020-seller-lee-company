/**
 * @author kouz95
 */

import React, { useEffect, useLayoutEffect } from "react";
import {
  BackHandler,
  Button,
  Keyboard,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { HeaderBackButton } from "@react-navigation/stack";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { EvilIcons } from "@expo/vector-icons";
import {
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from "recoil/dist";
import ArticleTitleForm from "../components/ArticleTitleForm";
import ArticlePriceForm from "../components/ArticlePriceForm";
import ArticleCreateScreenModal from "../components/ArticleCreateScreenModal";
import Photo from "../components/Photo";
import Tag from "../components/Tag";
import {
  articleContentsState,
  articleModalActivationState,
  articlePhotosState,
  articlePriceState,
  articleSelectedCategoryState,
  articleTitleState,
} from "../states/articleState";
import { tagsState } from "../states/TagState";
import { ArticleCreateScreenNavigationProp } from "../types/types";
import theme from "../colors";

import { memberIdState } from "../states/loginState";
import { articlesAPI } from "../api/api";
import ArticleCreateCategorySelect from "../components/ArticleCreateCategorySelect";

export default function ArticleCreateScreen() {
  const navigation = useNavigation<ArticleCreateScreenNavigationProp>();
  const photos = useRecoilValue(articlePhotosState);
  const title = useRecoilValue(articleTitleState);
  const selectedCategory = useRecoilValue(articleSelectedCategoryState);
  const price = useRecoilValue(articlePriceState);
  const contents = useRecoilValue(articleContentsState);
  const tags = useRecoilValue(tagsState);
  const memberId = useRecoilValue(memberIdState);

  const resetPhotos = useResetRecoilState(articlePhotosState);
  const resetTitle = useResetRecoilState(articleTitleState);
  const resetSelectedCategory = useResetRecoilState(
    articleSelectedCategoryState,
  );
  const resetPrice = useResetRecoilState(articlePriceState);
  const resetContents = useResetRecoilState(articleContentsState);
  const resetTags = useResetRecoilState(tagsState);

  const setArticleModalState = useSetRecoilState(articleModalActivationState);

  const resetCreateScreen = () => {
    resetPhotos();
    resetTitle();
    resetPrice();
    resetContents();
    resetSelectedCategory();
    resetTags();
  };

  const hasContents = () => {
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
      selectedCategory === ""
    );
  };

  const confirmToLeave = () => {
    if (hasContents()) {
      setArticleModalState(true);
      return;
    }
    resetCreateScreen();
    navigation.goBack();
  };

  useEffect(() => {
    const confirmToBackAction = () => {
      if (hasContents()) {
        setArticleModalState(true);
        return true;
      }
      resetCreateScreen();
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      confirmToBackAction,
    );

    return () => backHandler.remove();
  }, [hasContents, resetCreateScreen, setArticleModalState]);

  useLayoutEffect(() => {
    navigation.setOptions({
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

  const dynamicStyles = StyleSheet.create({
    priceCurrencyUnit: {
      fontSize: 18,
      color: price === 0 ? "lightgrey" : "black",
    },
    contentsText: {
      fontSize: 18,
      color: contents.length === 0 ? "grey" : "black",
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

  const postArticle = () => {
    return articlesAPI.post({
      title,
      price,
      category: selectedCategory,
      contents,
      tags: tags.map((tag) => tag.name),
      photos: photos.map((photo) => photo.uri),
      authorId: memberId,
    });
  };

  const goBackAfterPostAndReset = async () => {
    const response = await postArticle();
    if (response.status === 201) {
      resetCreateScreen();
      navigation.goBack();
    } else {
      console.warn("post article 실패");
    }
  };

  return (
    <KeyboardAwareScrollView
      enableOnAndroid
      contentContainerStyle={styles.container}
      enableAutomaticScroll={Platform.OS === "ios"}
    >
      <ArticleCreateScreenModal resetCreateScreen={resetCreateScreen} />
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
              <ArticleCreateCategorySelect />
            </View>
            <View style={styles.priceFormContainer}>
              <Text style={dynamicStyles.priceCurrencyUnit}>₩ </Text>
              <ArticlePriceForm />
            </View>
            <View style={styles.contentsFormContainer}>
              <TouchableOpacity
                style={styles.contentsFormButton}
                onPress={() => navigation.navigate("ArticleContentsFormScreen")}
              >
                <Text style={dynamicStyles.contentsText}>
                  {contents.length === 0 ? "내용을 입력해주세요." : contents}
                </Text>
              </TouchableOpacity>
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
          onPress={goBackAfterPostAndReset}
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
  contentsFormButton: {
    height: "100%",
    marginVertical: 15,
  },
  tagFormContainer: {
    borderTopColor: "#eaeaea",
    borderTopWidth: 1,
  },
  tagForm: {
    marginVertical: 15,
  },
});
