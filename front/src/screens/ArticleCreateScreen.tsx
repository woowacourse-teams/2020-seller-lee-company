/**
 * @author kouz95
 */

import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  Button,
} from "react-native";
import ArticleTitleForm from "../components/ArticleTitleForm";
import ArticlePriceForm from "../components/ArticlePriceForm";
import { useNavigation } from "@react-navigation/native";
import { useSetRecoilState, useRecoilValue, useRecoilState } from "recoil/dist";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  articleContentsState,
  articlePriceState,
  articleSelectedCategoryState,
  articleTitleState,
} from "../states/articleState";

export default function ArticleCreateScreen() {
  const navigation = useNavigation();
  const setTitle = useSetRecoilState(articleTitleState);
  const setPrice = useSetRecoilState(articlePriceState);
  const [contents, setContents] = useRecoilState(articleContentsState);
  const selectedCategory = useRecoilValue(articleSelectedCategoryState);

  return (
    <TouchableWithoutFeedback
      onPress={() => Keyboard.dismiss()}
      accessible={false}
    >
      <View style={styles.writeButtonContainer}>
        <View style={styles.addImageContainer}>
          <Text>이미지 추가</Text>
        </View>
        <View style={styles.titleFormContainer}>
          <ArticleTitleForm />
        </View>
        <View style={styles.selectCategoryContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("CategoryChoiceScreen")}
          >
            <Text style={styles.buttonText}>{selectedCategory}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.priceFormContainer}>
          <ArticlePriceForm />
        </View>
        <View style={styles.contentsFormContainer}>
          <TouchableOpacity
            style={styles.contentsFormButton}
            onPress={() => navigation.navigate("ArticleCreateForm")}
          >
            <Text>{contents.length === 0 ? "내용 입력" : contents}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.tagFormContainer}>
          <Text>태그 입력</Text>
        </View>
        <View style={styles.createButtonContainer}>
          <Button
            title={"완료"}
            onPress={() => {
              navigation.goBack();
              setPrice(0);
              setTitle("");
              setContents("");
            }}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  writeButtonContainer: {
    flex: 1,
  },
  topBarContainer: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "grey",
    borderWidth: 2,
    backgroundColor: "grey",
  },
  addImageContainer: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "grey",
    borderWidth: 2,
  },
  titleFormContainer: {
    flex: 2,
    justifyContent: "center",
    alignItems: "flex-start",
    borderColor: "grey",
    borderWidth: 2,
  },
  selectCategoryContainer: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "grey",
    borderWidth: 2,
  },
  button: {
    padding: 20,
    backgroundColor: "#fff",
  },
  buttonText: {
    fontSize: 20,
  },
  priceFormContainer: {
    flex: 2,
    justifyContent: "center",
    alignItems: "flex-start",
    borderColor: "grey",
    borderWidth: 2,
  },
  contentsFormContainer: {
    flex: 8,
    borderColor: "grey",
    borderWidth: 2,
  },
  contentsFormButton: {
    height: "100%",
  },
  tagFormContainer: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "grey",
    borderWidth: 2,
  },
  createButtonContainer: {
    flex: 2,
    backgroundColor: "grey",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "grey",
    borderWidth: 2,
  },
});
