package com.jikgorae.api.evaluation.application;

import static com.jikgorae.api.fixture.EvaluationFixture.*;
import static com.jikgorae.api.fixture.TradeFixture.*;
import static org.assertj.core.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.jikgorae.api.evaluation.domain.Evaluation;
import com.jikgorae.api.evaluation.domain.EvaluationRepository;
import com.jikgorae.api.member.domain.Member;

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
