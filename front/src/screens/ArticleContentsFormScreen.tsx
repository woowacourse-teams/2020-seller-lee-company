import React, { useLayoutEffect } from "react";
import { StyleSheet, TextInput } from "react-native";
import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { useRecoilState } from "recoil/dist";
import { HeaderBackButton, StackNavigationProp } from "@react-navigation/stack";
import { Feather } from "@expo/vector-icons";
import { articleContentsState } from "../states/articleState";
import { HomeStackParam, RootStackParam } from "../types/types";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

type ArticleContentsFormScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<HomeStackParam, "ArticleContentsFormScreen">,
  StackNavigationProp<RootStackParam, "HomeStack">
>;

export default function ArticleContentsFormScreen() {
  const navigation = useNavigation<ArticleContentsFormScreenNavigationProp>();

  const [contents, setContents] = useRecoilState(articleContentsState);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "상품 상세 설명",
      headerTitleAlign: "left",
      headerShown: true,
      headerLeft: () => (
        <HeaderBackButton
          labelVisible={false}
          onPress={navigation.goBack}
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

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      enableOnAndroid={true}
      enableAutomaticScroll={true}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={true}
    >
      <TextInput
        style={styles.form}
        placeholder={"내용을 입력해주세요."}
        textAlignVertical={"top"}
        keyboardType={"default"}
        onChangeText={(text) => setContents(text)}
        value={contents}
        multiline={true}
      />
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  form: {
    fontSize: 18,
  },
});
