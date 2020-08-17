package sellerlee.back.trade.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

import sellerlee.back.article.domain.Article;
import sellerlee.back.common.domain.BaseTimeEntity;
import sellerlee.back.member.domain.Member;

@Entity
public class Trade extends BaseTimeEntity {
    @Id
    @GeneratedValue
    private Long id;

    @OneToOne
    @JoinColumn(name = "article_id")
    private Article article;

    @ManyToOne
    @JoinColumn(name = "member_id", insertable = false, updatable = false)
    private Member buyer;

    @ManyToOne
    @JoinColumn(name = "member_id", insertable = false, updatable = false)
    private Member seller;

    protected Trade() {
    }

    public Trade(Long id, Article article, Member buyer, Member seller) {
        this.id = id;
        this.article = article;
        this.buyer = buyer;
        this.seller = seller;
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

    public Member getSeller() {
        return seller;
    }
}
