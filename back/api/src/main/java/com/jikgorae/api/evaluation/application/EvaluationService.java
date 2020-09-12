package com.jikgorae.api.evaluation.application;

import org.springframework.stereotype.Service;

import com.jikgorae.api.evaluation.domain.EvaluationRepository;

@Service
public class EvaluationService {
    private final EvaluationRepository evaluationRepository;

    public EvaluationService(EvaluationRepository evaluationRepository) {
        this.evaluationRepository = evaluationRepository;
    }

    public Long createEvaluation(EvaluationRequest request) {
        return evaluationRepository.save(request.toEvaluation())
                .getId();
    }
}
