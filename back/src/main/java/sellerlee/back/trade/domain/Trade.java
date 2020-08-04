package sellerlee.back.trade.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import sellerlee.back.article.domain.Article;
import sellerlee.back.common.domain.BaseTimeEntity;
import sellerlee.back.member.domain.Member;

@Entity
public class Trade extends BaseTimeEntity {
    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne
    @JoinColumn(name = "article_id")
    private Article article;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member buyer;

    protected Trade() {
    }

    public Trade(Long id, Article article, Member buyer) {
        this.id = id;
        this.article = article;
        this.buyer = buyer;
    }

    public Long getId() {
        return id;
    }

    public Article getArticle() {
        return article;
    }

    public Member getBuyer() {
        return buyer;
    }
}
