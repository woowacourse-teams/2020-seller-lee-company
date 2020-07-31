/**
 * @author joseph415
 */

package sellerlee.back.article.application;

import java.util.Arrays;
import java.util.List;

import sellerlee.back.article.domain.Article;
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
    private Member author;
    private Favorite favorite;

    private ArticleResponse() {
    }

    private ArticleResponse(Long id, String title, Category category, Long price,
            String contents, TradeType tradeType, TradeState tradeState,
            List<String> images, List<Tag> tags, Member author,
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
        this.author = author;
        this.favorite = favorite;
    }

    public static ArticleResponse of(Article article, Favorite favorite) {
        return new ArticleResponse(
                article.getId(),
                article.getTitle(),
                article.getCategory(),
                article.getPrice(),
                article.getContents(),
                // TODO: 2020/07/30 Article type 없음
                TradeType.DELEVERY,
                TradeState.SALING,
                article.getImages(),
                article.getTags().toList(),
                // TODO: 2020/07/30 Article type 없음
                new Member(1L, "turtle@woowabro.com", "1234", 4.5),
                favorite
        );
    }

    public static ArticleResponse of(Article article) {
        return new ArticleResponse(
                article.getId(),
                article.getTitle(),
                article.getCategory(),
                article.getPrice(),
                article.getContents(),
                // TODO: 2020/07/30 Article type 없음
                TradeType.DELEVERY,
                TradeState.SALING,
                article.getImages(),
                article.getTags().toList(),
                new Member(1L, "turtle@woowabro.com", "1234", 4.5),
                null
        );
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

    public Member getAuthor() {
        return author;
    }

    public Favorite getFavorite() {
        return favorite;
    }
}