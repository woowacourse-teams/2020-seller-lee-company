/**
 * @author jnsorn
 */

package sellerlee.back.evaluation.application;

import org.springframework.stereotype.Service;

import sellerlee.back.evaluation.domain.EvaluationRepository;

@Service
public class EvaluationService {
    private final EvaluationRepository evaluationRepository;

    public EvaluationService(EvaluationRepository evaluationRepository) {
        this.evaluationRepository = evaluationRepository;
    }

    public Long createEvaluation(EvaluationCreateRequest request) {
        return evaluationRepository.save(request.toEvaluation())
                .getId();
    }
}
