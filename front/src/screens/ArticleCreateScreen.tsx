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
import { contentsState, priceState, titleState } from "../articleState";
import { useRecoilState, useSetRecoilState } from "recoil/dist";

export default function ArticleCreateScreen() {
  const navigation = useNavigation();
  const setTitle = useSetRecoilState(titleState);
  const setPrice = useSetRecoilState(priceState);
  const [contents, setContents] = useRecoilState(contentsState);

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
          <Button
            title={contents === "" ? "내용 입력" : contents}
            onPress={() => navigation.navigate("ArticleCreateForm")}
          />
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
    justifyContent: "flex-start",
    alignItems: "flex-start",
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
