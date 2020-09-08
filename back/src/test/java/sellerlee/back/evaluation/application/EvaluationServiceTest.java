package sellerlee.back.evaluation.application;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;
import static sellerlee.back.fixture.EvaluationFixture.*;
import static sellerlee.back.fixture.TradeFixture.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import sellerlee.back.evaluation.domain.Evaluation;
import sellerlee.back.evaluation.domain.EvaluationRepository;
import sellerlee.back.member.domain.Member;

@ExtendWith(value = MockitoExtension.class)
public class EvaluationServiceTest {
    private EvaluationService evaluationService;
    @Mock
    private EvaluationRepository evaluationRepository;

    @BeforeEach
    void setUp() {
        evaluationService = new EvaluationService(evaluationRepository);
    }

    @Test
    void createEvaluation() {
        Evaluation expected = new Evaluation(1L, EVALUATION_REQUEST.getScores(), TRADE1,
                new Member(1L));
        when(evaluationRepository.save(any())).thenReturn(expected);

        Long actualId = evaluationService.createEvaluation(EVALUATION_REQUEST);

        assertThat(actualId).isEqualTo(expected.getId());
    }
}
