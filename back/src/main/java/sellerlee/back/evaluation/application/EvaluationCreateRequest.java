package sellerlee.back.evaluation.application;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;
import sellerlee.back.evaluation.domain.Score;

public class EvaluationCreateRequest {
    private List<Score> scores;

    private EvaluationCreateRequest() {
    }

    public EvaluationCreateRequest(List<Score> scores) {
        this.scores = scores;
    }

    public List<Score> getScores() {
        return scores;
    }
}
