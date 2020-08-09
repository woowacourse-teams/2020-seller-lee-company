package sellerlee.back.evaluation.application;

import java.util.List;

import sellerlee.back.evaluation.domain.Score;

public class EvaluationCreateRequest {
    private List<Score> scores;

    public EvaluationCreateRequest(List<Score> scores) {
        this.scores = scores;
    }

    public List<Score> getScores() {
        return scores;
    }
}
