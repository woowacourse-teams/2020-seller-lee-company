import React, { useEffect, useLayoutEffect } from "react";
import { Button, StyleSheet, View } from "react-native";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { HeaderBackButton } from "@react-navigation/stack";
import { Feather } from "@expo/vector-icons";
import SelectBuyerArticleInfo from "../components/SelectBuyer/SelectBuyerArticleInfo";
import { QUESTION_SIZE, questions } from "../data";
import QuestionAndAnswerCard from "../components/Evaluation/QuestionAndAnswerCard";
import theme from "../colors";
import { useRecoilValue, useResetRecoilState } from "recoil/dist";
import { scoresState } from "../states/evaluationState";
import { evaluationAPI } from "../api/api";

export default function EvaluationScreen() {
  const navigation = useNavigation();
  const scores = useRecoilValue(scoresState);
  const resetScoresState = useResetRecoilState(scoresState);
  /* 실제 코드 */
  //const title = useRecoilValue(articleTitleState);
  //const photo = useRecoilValue(articlePhotosState)[0];

  /* 테스트 용(title,photo 없으면 에러터져서 임의로 넣어놓음) */
  const title = "맥북";
  const photo = {
    uri:
      "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/mbp16touch-space-select-201911_GEO_KR?wid=1808&hei=1686&fmt=jpeg&qlt=80&.v=1573165435305",
  };

  const QUESTION_ID_INDEX = 0;
  const QUESTION_INDEX = 1;
  const isFocused = useIsFocused();

  useEffect(() => {
    resetScores();
  }, [isFocused]);

  useEffect(() => {
    incompleteAnswer();
  }, [scores.length]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "평가하기",
      headerTitleAlign: "left",
      headerLeft: () => (
        <HeaderBackButton
          labelVisible={false}
          onPress={() => goBackAndReset()}
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
      headerBackTitleVisible: false,
    });
  }, [navigation]);

  const incompleteAnswer = () => {
    return scores.length !== QUESTION_SIZE;
  };

  const goBackAndReset = () => {
    resetScores();
    navigation.goBack();
  };

  const resetScores = () => {
    resetScoresState();
  };

  const postEvaluation = async () => {
    const response = await evaluationAPI.post({ scores });
    if (response.status === 201) {
      goBackAndReset();
    } else {
      console.warn("평가 생성 실패");
    }
  };

  const dynamicStyles = StyleSheet.create({
    createButtonContainer: {
      backgroundColor: incompleteAnswer() ? "grey" : theme.primary,
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
        <Button
          title={"완료"}
          color={"white"}
          disabled={incompleteAnswer()}
          onPress={postEvaluation}
        />
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
