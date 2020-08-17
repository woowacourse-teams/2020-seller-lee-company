/**
 * @author jnsorn
 */

package sellerlee.back.evaluation.application;

import java.util.List;

import sellerlee.back.evaluation.domain.Evaluation;
import sellerlee.back.evaluation.domain.Score;
import sellerlee.back.member.domain.Member;
import sellerlee.back.trade.domain.Trade;

public class EvaluationCreateRequest {
    private List<Score> scores;
    private Trade trade;
    private Member target;

    private EvaluationCreateRequest() {
    }

    public EvaluationCreateRequest(List<Score> scores, Trade trade, Member target) {
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
