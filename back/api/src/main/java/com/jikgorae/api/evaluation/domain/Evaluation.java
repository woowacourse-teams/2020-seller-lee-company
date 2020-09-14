package com.jikgorae.api.evaluation.domain;

import java.util.List;

import javax.persistence.CollectionTable;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

import com.jikgorae.api.member.domain.Member;
import com.jikgorae.api.trade.domain.Trade;

@Entity
public class Evaluation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "evaluation_id")
    private Long id;

    @ElementCollection
    @CollectionTable(name = "score",
            joinColumns = @JoinColumn(name = "evaluation_id"))
    private List<Score> scores;

    @JoinColumn(name = "trade_id")
    @ManyToOne
    private Trade trade;

    @JoinColumn(name = "member_id")
    @OneToOne
    private Member target;

    protected Evaluation() {
    }

    public Evaluation(Long id, List<Score> scores, Trade trade, Member target) {
        this.id = id;
        this.scores = scores;
        this.trade = trade;
        this.target = target;
    }

    public Evaluation(List<Score> scores, Trade trade, Member target) {
        this(null, scores, trade, target);
    }

    public Long getId() {
        return id;
    }
}
