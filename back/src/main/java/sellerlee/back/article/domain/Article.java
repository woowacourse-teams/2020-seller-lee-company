package sellerlee.back.article.domain;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;

import sellerlee.back.common.domain.BaseTimeEntity;
import sellerlee.back.member.domain.Member;

@Entity
public class Article extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "article_id")
    private Long id;

    private String title;

    @Embedded
    private Tags tags;

    @Enumerated(EnumType.STRING)
    private Category category;

    @Lob
    private String contents;

    private Long price;

    @Enumerated(EnumType.STRING)
    private TradeState tradeState;

    @Embedded
    private Photos photos;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member author;

    protected Article() {
    }

    public Article(Long id, String title, Tags tags, Category category, String contents,
            Long price, TradeState tradeState, Photos photos, Member author) {
        this.id = id;
        this.title = title;
        this.tags = tags;
        this.category = category;
        this.contents = contents;
        this.price = price;
        this.tradeState = tradeState;
        this.photos = photos;
        this.author = author;
    }

    public Article(LocalDateTime createdTime, LocalDateTime modifiedTime, Long id, String title,
            Tags tags, Category category, String contents, Long price, TradeState tradeState,
            Photos photos, Member author) {
        this.createdTime = createdTime;
        this.modifiedTime = modifiedTime;
        this.id = id;
        this.title = title;
        this.tags = tags;
        this.category = category;
        this.contents = contents;
        this.price = price;
        this.tradeState = tradeState;
        this.photos = photos;
        this.author = author;
    }

    public Article(String title, Tags tags, Category category, String contents, Long price,
            TradeState tradeState, Photos photos, Member author) {
        this(null, title, tags, category, contents, price, tradeState, photos, author);
    }

    public Article(Long id) {
        this(id, null, null, null, null, null, null, null, null);
    }

    public void update(Article article) {
        title = article.title;
        price = article.price;
        category = article.category;
        contents = article.contents;
        tags = article.tags;
        photos = article.photos;
    }

    public void updateState(TradeState tradeState) {
        this.tradeState = tradeState;
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public Tags getTags() {
        return tags;
    }

    public Category getCategory() {
        return category;
    }

    public String getContents() {
        return contents;
    }

    public Long getPrice() {
        return price;
    }

    public TradeState getTradeState() {
        return tradeState;
    }

    public Photos getPhotos() {
        return photos;
    }

    public Member getAuthor() {
        return author;
    }
}
