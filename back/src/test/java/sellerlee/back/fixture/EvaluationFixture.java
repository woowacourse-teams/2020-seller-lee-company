package sellerlee.back.fixture;

import static sellerlee.back.fixture.MemberFixture.*;
import static sellerlee.back.fixture.TradeFixture.*;

import java.util.ArrayList;
import java.util.List;

import sellerlee.back.evaluation.application.EvaluationCreateRequest;
import sellerlee.back.evaluation.domain.Score;

public class EvaluationFixture {
    private static final List<Score> SCORES = new ArrayList() {{
        add(new Score(1, 5));
        add(new Score(2, 4));
        add(new Score(3, 3));
        add(new Score(4, 2));
        add(new Score(5, 1));
    }};
    public static final EvaluationCreateRequest EVALUATION_CREATE_REQUEST = new EvaluationCreateRequest(
            SCORES, TRADE1, MEMBER1);
}
