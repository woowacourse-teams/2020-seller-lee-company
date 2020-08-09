/**
 * @author jnsorn
 */

package sellerlee.back.evaluation.domain;

import java.util.List;

import javax.persistence.CollectionTable;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;

@Entity
public class Evaluation {
    @Id
    @GeneratedValue
    @Column(name = "evaluation_id")
    private Long id;

    @ElementCollection
    @CollectionTable(name = "score", joinColumns = @JoinColumn(name = "evaluation_id"))
    private List<Score> scores;

    protected Evaluation() {
    }

    public Evaluation(Long id, List<Score> scores) {
        this.id = id;
        this.scores = scores;
    }

    public Evaluation(List<Score> scores) {
        this(null, scores);
    }

    public Long getId() {
        return id;
    }
}
