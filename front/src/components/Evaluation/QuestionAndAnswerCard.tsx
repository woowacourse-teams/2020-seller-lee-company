import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import StarRating from "react-native-star-rating";
import { useRecoilState } from "recoil/dist";
import theme from "../../colors";
import { scoresState } from "../../states/evaluationState";
import { useIsFocused } from "@react-navigation/native";

interface Question {
  questionId: number;
  question: string;
}

export default function QuestionAndAnswerCard({
  questionId,
  question,
}: Question) {
  const [answer, setAnswer] = useState(0);
  const [scores, setScores] = useRecoilState(scoresState);

  const isFocused = useIsFocused();

  useEffect(() => {
    setAnswer(0);
  }, [isFocused]);

  const setData = (rating: number) => {
    if (scores.some((score) => score.questionId === questionId)) {
      const index = scores.findIndex(
        (score) => score.questionId === questionId,
      );
      const copy = [...scores];
      copy[index] = { ...copy[index], score: rating };
      return copy;
    }
    return [...scores].concat({
      questionId: questionId,
      score: rating,
    });
  };

  const onStarRatingPress = async (rating: number) => {
    setAnswer(rating);
    setScores(setData(rating));
  };

  return (
    <View style={styles.container}>
      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>{question}</Text>
      </View>
      <View style={styles.answerContainer}>
        <StarRating
          maxStars={5}
          rating={answer}
          fullStarColor={theme.primary}
          emptyStarColor={theme.primary}
          selectedStar={onStarRatingPress}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: "flex-start", margin: 10 },
  questionContainer: { margin: 5 },
  questionText: { fontSize: 20 },
  answerContainer: { alignItems: "center" },
});
