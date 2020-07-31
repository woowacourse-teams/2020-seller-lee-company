/**
 * @author joseph415
 */

package sellerlee.back.favorite.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import sellerlee.back.article.domain.Article;
import sellerlee.back.member.domain.Member;

@Entity
public class Favorite {
    @Id
    @GeneratedValue
    @Column(name = "favorite_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "article_id", insertable = false, updatable = false)
    Article article;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", insertable = false, updatable = false)
    Member member;

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
