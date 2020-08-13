import React, { useLayoutEffect } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useRecoilState } from "recoil/dist";
import { HeaderBackButton } from "@react-navigation/stack";
import { EvilIcons } from "@expo/vector-icons";
import { articleContentsState } from "../states/articleState";
import { ArticleContentsFormScreenNavigationProp } from "../types/types";

export default function ArticleContentsFormScreen() {
  const navigation = useNavigation<ArticleContentsFormScreenNavigationProp>();
  const [contents, setContents] = useRecoilState(articleContentsState);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "상품 설명",
      headerLeft: () => (
        <HeaderBackButton
          labelVisible={false}
          onPress={navigation.goBack}
          backImage={() => (
            <EvilIcons name="chevron-left" size={35} color={"grey"} />
          )}
        />
      ),
      headerLeftContainerStyle: { paddingLeft: 10 },
    });
  });

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.form}
        placeholder={"내용을 입력해주세요."}
        keyboardType={"default"}
        onChangeText={(text) => setContents(text)}
        value={contents}
        multiline={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  form: {
    fontSize: 18,
    paddingLeft: 15,
    paddingTop: 15,
  },
});
