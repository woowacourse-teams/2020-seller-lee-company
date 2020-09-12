package com.jikgorae.api.evaluation.application;

import java.util.List;

import com.jikgorae.api.evaluation.domain.Evaluation;
import com.jikgorae.api.evaluation.domain.Score;
import com.jikgorae.api.trade.domain.Trade;
import com.jikgorae.common.member.domain.Member;

public class EvaluationRequest {
    private List<Score> scores;
    private Trade trade;
    private Member target;

    private EvaluationRequest() {
    }

    public EvaluationRequest(List<Score> scores, Trade trade, Member target) {
        this.scores = scores;
        this.trade = trade;
        this.target = target;
    }

    public List<Score> getScores() {
        return scores;
    }

    public Evaluation toEvaluation() {
        return new Evaluation(scores, trade, target);
    }
}
