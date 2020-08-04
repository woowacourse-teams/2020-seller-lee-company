package sellerlee.back.article.application;

import static java.util.stream.Collectors.*;

import java.time.format.DateTimeFormatter;
import java.util.List;

import sellerlee.back.article.domain.Article;

public class ArticleResponse {
    private String title;
    private Long price;
    private String tradeType;
    private String tradeLocation;
    private String thumbnail;
    private String createdTime;

    private ArticleResponse(String title, Long price, String tradeType, String tradeLocation,
            String thumbnail, String createdTime) {
        this.title = title;
        this.price = price;
        this.tradeType = tradeType;
        this.tradeLocation = tradeLocation;
        this.thumbnail = thumbnail;
        this.createdTime = createdTime;
    }

    public static ArticleResponse of(Article article) {
        return new ArticleResponse(
                article.getTitle(),
                article.getPrice(),
                article.getTradeType().getTradeType(),
                article.getTradeLocation(),
                article.getPhotos().pickThumbnail(),
                article.getCreatedTime().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME)
        );
    }

    public static List<ArticleResponse> listOf(List<Article> articles) {
        return articles.stream()
                .map(ArticleResponse::of)
                .collect(toList());
    }

    public String getTitle() {
        return title;
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

    public String getThumbnail() {
        return thumbnail;
    }

    public String getCreatedTime() {
        return createdTime;
    }
}
