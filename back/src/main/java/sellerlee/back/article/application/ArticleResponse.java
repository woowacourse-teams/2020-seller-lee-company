/**
 * @author joseph415
 */

package sellerlee.back.article.application;

import java.time.LocalDateTime;
import java.util.List;

import sellerlee.back.article.domain.Article;
import sellerlee.back.member.application.MemberResponse;

public class ArticleResponse {
    private Long id;
    private String title;
    private String category;
    private String contents;
    private Long price;
    private String tradeType;
    private String tradeLocation;
    private String tradeState;
    private List<String> photos;
    private MemberResponse author;
    private Boolean favoriteState;
    private LocalDateTime createdTime;

    private ArticleResponse() {
    }

    public ArticleResponse(Long id, String title, String category, String contents,
            Long price, String tradeType, String tradeLocation, String tradeState,
            List<String> photos, MemberResponse author, Boolean favoriteState,
            LocalDateTime createdTime) {
        this.id = id;
        this.title = title;
        this.category = category;
        this.contents = contents;
        this.price = price;
        this.tradeType = tradeType;
        this.tradeLocation = tradeLocation;
        this.tradeState = tradeState;
        this.photos = photos;
        this.author = author;
        this.favoriteState = favoriteState;
        this.createdTime = createdTime;
    }

    public static ArticleResponse of(Article article, boolean favoriteState) {
        return new ArticleResponse(
                article.getId(),
                article.getTitle(),
                article.getCategory().getCategory(),
                article.getContents(),
                article.getPrice(),
                article.getTradeType().getTradeType(),
                article.getTradeLocation(),
                article.getTradeState().getTradeState(),
                article.getPhotos().getPhotos(),
                MemberResponse.of(article.getAuthor()),
                favoriteState,
                article.getCreatedTime()
        );
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getCategory() {
        return category;
    }

    public String getContents() {
        return contents;
    }

    public Long getPrice() {
        return price;
    }

    public String getTradeType() {
        return tradeType;
    }

    public String getTradeLocation() {
        return tradeLocation;
    }

    public String getTradeState() {
        return tradeState;
    }

    public List<String> getPhotos() {
        return photos;
    }

    public MemberResponse getAuthor() {
        return author;
    }

    public Boolean getFavoriteState() {
        return favoriteState;
    }

    public LocalDateTime getCreatedTime() {
        return createdTime;
    }
}