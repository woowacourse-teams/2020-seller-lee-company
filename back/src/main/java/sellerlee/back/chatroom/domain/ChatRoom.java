package sellerlee.back.chatroom.domain;

import sellerlee.back.article.domain.Article;
import sellerlee.back.member.domain.Member;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToOne;

@Entity
public class ChatRoom {
    @Id
    @GeneratedValue
    private Long id;

    @OneToOne
    private Article article;

    @OneToOne
    private Member buyer;

    protected ChatRoom() {
    }

    public ChatRoom(Long id, Article article, Member buyer) {
        this.id = id;
        this.article = article;
        this.buyer = buyer;
    }

    public ChatRoom(Long articleId, Long buyerId) {
        this(null, new Article(articleId), new Member(buyerId));
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
