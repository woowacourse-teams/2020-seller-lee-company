package sellerlee.back.fixture;

import static sellerlee.back.fixture.MemberFixture.*;
import static sellerlee.back.fixture.TradeFixture.*;

import java.util.List;

import org.assertj.core.util.Lists;

import sellerlee.back.evaluation.application.EvaluationRequest;
import sellerlee.back.evaluation.domain.Score;

public class EvaluationFixture {
    private static final List<Score> SCORES = Lists.newArrayList(
            new Score(1, 5),
            new Score(2, 4),
            new Score(3, 3),
            new Score(4, 2),
            new Score(5, 1)
    );

    public static final EvaluationRequest EVALUATION_REQUEST = new EvaluationRequest(
            SCORES, TRADE1, MEMBER1);
}
