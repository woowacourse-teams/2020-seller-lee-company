package sellerlee.back.favorite.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.springframework.data.domain.AbstractAggregateRoot;

import sellerlee.back.article.domain.Article;
import sellerlee.back.favorite.application.FavoriteCreatedEvent;
import sellerlee.back.favorite.application.FavoriteRemovedEvent;
import sellerlee.back.member.domain.Member;

@Entity
public class Favorite extends AbstractAggregateRoot<Favorite> {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "favorite_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "article_id")
    private Article article;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    protected Favorite() {
    }

    public Favorite(Long id, Article article, Member member) {
        this.id = id;
        this.article = article;
        this.member = member;
    }

    public Favorite(Article article, Member member) {
        this(null, article, member);
    }

    public Favorite create() {
        this.registerEvent(new FavoriteCreatedEvent(this));
        return this;
    }

    public Favorite remove() {
        this.registerEvent(new FavoriteRemovedEvent(this));
        return this;
    }

    public Long getId() {
        return id;
    }

    public Article getArticle() {
        return article;
    }

    public Member getMember() {
        return member;
    }
}
