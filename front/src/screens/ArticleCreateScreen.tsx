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

export default function ArticleCreateScreen() {
  const navigation = useNavigation();
  return (
    <TouchableWithoutFeedback
      onPress={() => Keyboard.dismiss()}
      accessible={false}
    >
      <View style={styles.container}>
        <View style={styles.addImageContainer}>
          <Text>이미지 추가</Text>
        </View>
        <View style={styles.titleFormContainer}>
          <ArticleTitleForm />
        </View>
        <View style={styles.selectCategoryContainer}>
          <Text>카테고리 선택</Text>
        </View>
        <View style={styles.priceFormContainer}>
          <ArticlePriceForm />
        </View>
        <View style={styles.contentsFormContainer}>
          <Text>내용 입력</Text>
        </View>
        <View style={styles.tagFormContainer}>
          <Text>태그 입력</Text>
        </View>
        <View style={styles.createButtonContainer}>
          <Button title={"완료"} onPress={() => navigation.goBack()} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
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
  priceFormContainer: {
    flex: 2,
    justifyContent: "center",
    alignItems: "flex-start",
    borderColor: "grey",
    borderWidth: 2,
  },
  contentsFormContainer: {
    flex: 8,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "grey",
    borderWidth: 2,
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
