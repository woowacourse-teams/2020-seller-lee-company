/**
 * @author joseph415
 */

package sellerlee.back.article.application;

import java.util.List;

import sellerlee.back.article.domain.Category;
import sellerlee.back.article.domain.Tag;
import sellerlee.back.article.domain.TradeState;
import sellerlee.back.article.domain.TradeType;
import sellerlee.back.favorite.domain.Favorite;
import sellerlee.back.member.domain.Member;

public class ArticleResponse {
    private Long id;
    private String title;
    private Category category;
    private Long price;
    private String contents;
    private TradeType tradeType;
    private TradeState tradeState;
    private List<String> images;
    private List<Tag> tags;
    private Member member;
    private Favorite favorite;

    public ArticleResponse() {
    }

    public ArticleResponse(Long id, String title, Category category, Long price,
            String contents, TradeType tradeType, TradeState tradeState,
            List<String> images, List<Tag> tags, Member member,
            Favorite favorite) {
        this.id = id;
        this.title = title;
        this.category = category;
        this.price = price;
        this.contents = contents;
        this.tradeType = tradeType;
        this.tradeState = tradeState;
        this.images = images;
        this.tags = tags;
        this.member = member;
        this.favorite = favorite;
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public Category getCategory() {
        return category;
    }

    public Long getPrice() {
        return price;
    }

    public String getContents() {
        return contents;
    }

    public TradeType getTradeType() {
        return tradeType;
    }

    public TradeState getTradeState() {
        return tradeState;
    }

    public List<String> getImages() {
        return images;
    }

    public List<Tag> getTags() {
        return tags;
    }

    public Member getMember() {
        return member;
    }

    public Favorite getFavorite() {
        return favorite;
    }
}