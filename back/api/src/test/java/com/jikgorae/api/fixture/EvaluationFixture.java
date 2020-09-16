package com.jikgorae.api.fixture;

import static com.jikgorae.api.fixture.TradeFixture.*;

import java.util.List;

import org.assertj.core.util.Lists;

import com.jikgorae.api.evaluation.application.EvaluationRequest;
import com.jikgorae.api.evaluation.domain.Score;

public class EvaluationFixture {
    private static final List<Score> SCORES = Lists.newArrayList(
            new Score(1, 5),
            new Score(2, 4),
            new Score(3, 3),
            new Score(4, 2),
            new Score(5, 1)
    );

    public static final EvaluationRequest EVALUATION_REQUEST = new EvaluationRequest(
            SCORES, TRADE1, MemberFixture.MEMBER1);
}
