package com.jikgorae.api.evaluation.presentation;

import static com.jikgorae.api.evaluation.presentation.EvaluationController.*;

import java.net.URI;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jikgorae.api.evaluation.application.EvaluationRequest;
import com.jikgorae.api.evaluation.application.EvaluationService;

@RequestMapping(EVALUATION_API_URI)
@RestController
public class EvaluationController {
    public static final String EVALUATION_API_URI = "/api/evaluations";

    private final EvaluationService evaluationService;

    public EvaluationController(EvaluationService evaluationService) {
        this.evaluationService = evaluationService;
    }

    @PostMapping
    public ResponseEntity<Void> createEvaluation(@RequestBody EvaluationRequest request) {
        Long evaluationId = evaluationService.createEvaluation(request);

        return ResponseEntity
                .created(URI.create(EVALUATION_API_URI + "/" + evaluationId))
                .build();
    }
}
