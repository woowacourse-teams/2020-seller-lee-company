package com.jikgorae.api.evaluation.domain;

import java.util.Objects;

import javax.persistence.Access;
import javax.persistence.AccessType;
import javax.persistence.Embeddable;

@Access(AccessType.FIELD)
@Embeddable
public class Score {
    private Integer questionId;
    private Integer score;

    protected Score() {
    }

    public Score(Integer questionId, Integer score) {
        this.questionId = questionId;
        this.score = score;
    }

    public Integer getQuestionId() {
        return questionId;
    }

    public Integer getScore() {
        return score;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;
        Score score1 = (Score)o;
        return Objects.equals(questionId, score1.questionId) &&
                Objects.equals(score, score1.score);
    }

    @Override
    public int hashCode() {
        return Objects.hash(questionId, score);
    }
}

