/**
 * @author jnsorn
 */

import React, { useLayoutEffect } from "react";
import { Button, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { HeaderBackButton } from "@react-navigation/stack";
import { EvilIcons } from "@expo/vector-icons";
import SelectBuyerArticleInfo from "../components/SelectBuyer/SelectBuyerArticleInfo";
import { QUESTION_SIZE, questions } from "../data";
import QuestionAndAnswerCard from "../components/Evaluation/QuestionAndAnswerCard";
import theme from "../colors";
import { useRecoilState, useResetRecoilState } from "recoil/dist";
import { questionAndAnswerState } from "../states/evaluationState";
import { evaluationAPI } from "../api/api";

export default function EvaluationScreen() {
  const navigation = useNavigation();
  const [questionAndAnswer, setQuestionAndAnswer] = useRecoilState(
    questionAndAnswerState,
  );
  const resetQuestionAndAnswer = useResetRecoilState(questionAndAnswerState);
  //const title = useRecoilValue(articleTitleState);
  //const photo = useRecoilValue(articlePhotosState)[0];
  const title = "맥북";
  const photo = {
    uri:
      "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/mbp16touch-space-select-201911_GEO_KR?wid=1808&hei=1686&fmt=jpeg&qlt=80&.v=1573165435305",
  };
  const QUESTION_ID_INDEX = 0;
  const QUESTION_INDEX = 1;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "거래 후기",
      headerLeft: () => (
        <HeaderBackButton
          labelVisible={false}
          onPress={() => navigation.goBack()}
          backImage={() => (
            <EvilIcons name="chevron-left" size={35} color="black" />
          )}
        />
      ),
      headerLeftContainerStyle: { paddingLeft: 5 },
      headerBackTitleVisible: false,
    });
  }, [navigation]);

  const incompleteAnswer = () => {
    return questionAndAnswer.size !== QUESTION_SIZE;
  };

  const goBackAndReset = async () => {
    const response = await evaluationAPI.post({
      questionAndAnswer: questionAndAnswer,
    });

    if (response.status === 201) {
      resetAnswer();
      navigation.goBack();
    } else {
      console.warn("평가 생성 실패");
    }
  };

  const resetAnswer = () => {
    resetQuestionAndAnswer();
  };

  const dynamicStyles = StyleSheet.create({
    createButtonContainer: {
      backgroundColor: incompleteAnswer() ? "grey" : theme.primary,
      flex: 3,
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
          onPress={goBackAndReset}
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
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    borderTopColor: "lightgrey",
    borderBottomColor: "lightgrey",
    borderTopWidth: 0.7,
    borderBottomWidth: 0.7,
  },
  QAndAListContainer: {
    flex: 5,
  },
});
