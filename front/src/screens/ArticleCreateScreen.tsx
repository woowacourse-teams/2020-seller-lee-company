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
  TouchableOpacity,
} from "react-native";
import ArticleTitleForm from "../components/ArticleTitleForm";
import ArticlePriceForm from "../components/ArticlePriceForm";
import { useNavigation } from "@react-navigation/native";
import { useSetRecoilState, useRecoilValue, useRecoilState } from "recoil/dist";
import {
  articleContentsState,
  articlePriceState,
  articleSelectedCategoryState,
  articleTitleState,
} from "../states/articleState";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Photo from "../components/Photo";

export default function ArticleCreateScreen() {
  const navigation = useNavigation();
  const setTitle = useSetRecoilState(articleTitleState);
  const setPrice = useSetRecoilState(articlePriceState);
  const [contents, setContents] = useRecoilState(articleContentsState);
  const selectedCategory = useRecoilValue(articleSelectedCategoryState);

  return (
    <View style={styles.container}>
      <View style={styles.addedImageContainer}>
        <Photo />
      </View>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.contentsContainer}>
          <View style={styles.titleFormContainer}>
            <ArticleTitleForm />
          </View>

          <View style={styles.selectCategoryContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("CategoryChoiceScreen")}
            >
              <Text style={styles.buttonText}>{selectedCategory}</Text>
              <MaterialCommunityIcons
                name="chevron-down"
                size={22}
                color="black"
                style={styles.selectCategoryArrowIcon}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.priceFormContainer}>
            <ArticlePriceForm />
          </View>
          <View style={styles.contentsFormContainer}>
            <TouchableOpacity
              style={styles.contentsFormButton}
              onPress={() => navigation.navigate("ArticleContentsFormScreen")}
            >
              <Text>{contents.length === 0 ? "내용 입력" : contents}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.tagFormContainer}>
            <Text>태그 입력</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  addedImageContainer: {
    flex: 4,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
    marginVertical: 10,
  },
  contentsContainer: {
    flex: 29.5,
    paddingHorizontal: 20,
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
  button: {
    flex: 1,
    flexDirection: "row",
    height: "100%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  buttonText: {
    fontSize: 18,
    textAlign: "left",
  },
  selectCategoryArrowIcon: {
    alignItems: "center",
  },
  priceFormContainer: {
    flex: 3,
    justifyContent: "center",
    alignItems: "flex-start",
    borderTopColor: "#eaeaea",
    borderTopWidth: 1,
  },
  contentsFormContainer: {
    backgroundColor: "yellow",
    flex: 14.5,
    borderTopColor: "#eaeaea",
    borderTopWidth: 1,
  },
  contentsFormButton: {
    height: "100%",
  },
  tagFormContainer: {
    flex: 4,
    justifyContent: "center",
    alignItems: "center",
    borderTopColor: "#eaeaea",
    borderTopWidth: 1,
  },
  createButtonContainer: {
    flex: 2,
    backgroundColor: "grey",
    justifyContent: "center",
    alignItems: "center",
    borderTopColor: "#eaeaea",
    borderTopWidth: 1,
  },
});
