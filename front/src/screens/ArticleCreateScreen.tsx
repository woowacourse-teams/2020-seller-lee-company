/**
 * @author kouz95 lxxjn0
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
  Platform,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import ArticleTitleForm from "../components/ArticleTitleForm";
import ArticlePriceForm from "../components/ArticlePriceForm";
import { useNavigation } from "@react-navigation/native";
import { useSetRecoilState, useRecoilState } from "recoil/dist";
import {
  articleContentsState,
  articlePriceState,
  articleSelectedCategoryState,
  articleTitleState,
} from "../states/articleState";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Photo from "../components/Photo";
import Tag from "../components/Tag";
import { tagBoxesState } from "../states/TagState";

export default function ArticleCreateScreen() {
  const navigation = useNavigation();
  const setTitle = useSetRecoilState(articleTitleState);
  const [price, setPrice] = useRecoilState(articlePriceState);
  const [contents, setContents] = useRecoilState(articleContentsState);
  const [selectedCategory, setSelectedCategory] = useRecoilState(
    articleSelectedCategoryState,
  );
  const setTagBoxes = useSetRecoilState(tagBoxesState);

  const dynamicStyles = StyleSheet.create({
    priceCurrencyUnit: {
      fontSize: 18,
      color: price === 0 ? "lightgrey" : "black",
    },
    contentsText: {
      fontSize: 18,
      color: contents.length === 0 ? "grey" : "black",
    },
  });

  return (
    <KeyboardAwareScrollView
      enableOnAndroid
      contentContainerStyle={styles.container}
      enableAutomaticScroll={Platform.OS === "ios"}
    >
      <View style={styles.contentsContainer}>
        <View style={styles.addedImageContainer}>
          <Photo />
        </View>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={styles.touchableWithoutFeedbackContainer}>
            <View style={styles.titleFormContainer}>
              <ArticleTitleForm />
            </View>

            <View style={styles.selectCategoryContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate("CategoryChoiceScreen")}
              >
                <Text style={styles.buttonText}>
                  {selectedCategory === "" ? "카테고리" : selectedCategory}
                </Text>
                <MaterialCommunityIcons
                  name="chevron-down"
                  size={22}
                  color="black"
                  style={styles.selectCategoryArrowIcon}
                />
              </TouchableOpacity>
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
      <View style={styles.createButtonContainer}>
        <Button
          title={"완료"}
          color={"white"}
          onPress={() => {
            navigation.goBack();
            setTitle("");
            setPrice(0);
            setContents("");
            setSelectedCategory("");
            setTagBoxes([]);
          }}
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
  addedImageContainer: {
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
  createButtonContainer: {
    flex: 3,
    backgroundColor: "orange",
    justifyContent: "center",
    alignItems: "center",
    borderTopColor: "#eaeaea",
    borderTopWidth: 1,
  },
});
