/**
 * @author jnsorn
 */

import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import StarRating from "react-native-star-rating";
import { questionAndAnswerState } from "../../states/evaluationState";
import { useSetRecoilState } from "recoil/dist";

interface Question {
  questionId: number;
  question: string;
}

export default function QuestionAndAnswerCard({
  questionId,
  question,
}: Question) {
  const [answer, setAnswer] = useState(0);
  const setQuestionAndAnswer = useSetRecoilState(questionAndAnswerState);
  const onStarRatingPress = (rating: number) => {
    setAnswer(rating);
  };

  useEffect(() => {
    setQuestionAndAnswer((questionAndAnswer) =>
      questionAndAnswer.set(questionId, answer),
    );
  }, [answer]);

  return (
    <View style={styles.container}>
      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>{question}</Text>
      </View>
      <View style={styles.answerContainer}>
        <StarRating
          maxStars={5}
          rating={answer}
          selectedStar={(rating) => onStarRatingPress(rating)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: "flex-start" },
  questionContainer: {},
  questionText: {},
  answerContainer: { alignItems: "center" },
});
