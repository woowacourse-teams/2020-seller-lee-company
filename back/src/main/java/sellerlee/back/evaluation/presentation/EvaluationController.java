package sellerlee.back.evaluation.presentation;

import static sellerlee.back.evaluation.presentation.EvaluationController.*;

import java.net.URI;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import sellerlee.back.evaluation.application.EvaluationRequest;
import sellerlee.back.evaluation.application.EvaluationService;

@RequestMapping(EVALUATION_URI)
@RestController
public class EvaluationController {
    public static final String EVALUATION_URI = "/evaluations";

    private final EvaluationService evaluationService;

    public EvaluationController(EvaluationService evaluationService) {
        this.evaluationService = evaluationService;
    }

    @PostMapping
    public ResponseEntity<Void> createEvaluation(@RequestBody EvaluationRequest request) {
        Long evaluationId = evaluationService.createEvaluation(request);

        return ResponseEntity
                .created(URI.create(EVALUATION_URI + "/" + evaluationId))
                .build();
    }
}
