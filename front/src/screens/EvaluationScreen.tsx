import React, { useLayoutEffect } from "react";
import { Button, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { HeaderBackButton } from "@react-navigation/stack";
import { EvilIcons } from "@expo/vector-icons";
import SelectBuyerArticleInfo from "../components/SelectBuyer/SelectBuyerArticleInfo";
import { questions } from "../data";
import QuestionAndAnswerCard from "../components/Evaluation/QuestionAndAnswerCard";
import theme from "../colors";
import { useRecoilValue, useResetRecoilState } from "recoil/dist";
import { scoresState } from "../states/evaluationState";
import { evaluationAPI } from "../api/api";
import { articlePhotosState, articleTitleState } from "../states/articleState";

export default function EvaluationScreen() {
  const navigation = useNavigation();
  const scores = useRecoilValue(scoresState);
  const resetScoresState = useResetRecoilState(scoresState);
  const title = useRecoilValue(articleTitleState);
  const photo = useRecoilValue(articlePhotosState)[0];

  const QUESTION_ID_INDEX = 0;
  const QUESTION_INDEX = 1;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "거래 후기",
      headerLeft: () => (
        <HeaderBackButton
          labelVisible={false}
          onPress={() => {
            navigation.goBack();
            resetAnswer();
          }}
          backImage={() => (
            <EvilIcons name="chevron-left" size={35} color="black" />
          )}
        />
      ),
      headerLeftContainerStyle: { paddingLeft: 5 },
      headerBackTitleVisible: false,
    });
  }, [navigation]);

  const goBackAndReset = async () => {
    const response = await evaluationAPI.post({ scores });
    if (response.status === 201) {
      resetAnswer();
      navigation.goBack();
    } else {
      console.warn("평가 생성 실패");
    }
  };

  const resetAnswer = () => {
    resetScoresState();
  };

  const dynamicStyles = StyleSheet.create({
    createButtonContainer: {
      backgroundColor: theme.primary,
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      borderTopColor: "#eaeaea",
      borderTopWidth: 1,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.articleInfoContainer}>
        <SelectBuyerArticleInfo title={title} photo={photo.uri} />
      </View>
      <View style={styles.QAndAListContainer}>
        {[...questions.entries()].map((value) => (
          <QuestionAndAnswerCard
            key={value[QUESTION_ID_INDEX]}
            questionId={value[QUESTION_ID_INDEX]}
            question={value[QUESTION_INDEX]}
          />
        ))}
      </View>
      <View style={dynamicStyles.createButtonContainer}>
        <Button title={"완료"} color={"white"} onPress={goBackAndReset} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  articleInfoContainer: {
    backgroundColor: "rgba(255,255,255,0.5)",
    flex: 2,
    flexDirection: "row",
    justifyContent: "center",
    borderTopColor: "lightgrey",
    borderBottomColor: "lightgrey",
    borderTopWidth: 0.7,
    borderBottomWidth: 0.7,
  },
  QAndAListContainer: {
    flex: 9,
  },
});
