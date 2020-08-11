/**
 * @author joseph415 lxxjn0
 */

package sellerlee.back.article.domain;

import javax.persistence.Column;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;

import sellerlee.back.member.domain.Member;

@Entity
public class Article extends BaseTimeEntity {
    @Id
    @GeneratedValue
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
    private TradeType tradeType;

    private String tradeLocation;

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
            Long price, TradeType tradeType, String tradeLocation,
            TradeState tradeState, Photos photos, Member author) {
        this.id = id;
        this.title = title;
        this.tags = tags;
        this.category = category;
        this.contents = contents;
        this.price = price;
        this.tradeType = tradeType;
        this.tradeLocation = tradeLocation;
        this.tradeState = tradeState;
        this.photos = photos;
        this.author = author;
    }

    public Article(String title, Tags tags, Category category, String contents,
            Long price, TradeType tradeType, String tradeLocation,
            TradeState tradeState, Photos photos, Member author) {
        this(null, title, tags, category, contents, price, tradeType, tradeLocation, tradeState,
                photos, author);
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

    public TradeType getTradeType() {
        return tradeType;
    }

    public String getTradeLocation() {
        return tradeLocation;
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
