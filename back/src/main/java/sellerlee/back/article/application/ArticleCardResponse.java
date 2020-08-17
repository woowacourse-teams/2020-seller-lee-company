package sellerlee.back.article.application;

import static java.util.stream.Collectors.*;

import java.time.format.DateTimeFormatter;
import java.util.List;

import sellerlee.back.article.domain.Article;

public class ArticleCardResponse {
    private String title;
    private Long price;
    private String thumbnail;
    private String createdTime;

    private ArticleCardResponse() {
    }

    private ArticleCardResponse(String title, Long price, String thumbnail, String createdTime) {
        this.title = title;
        this.price = price;
        this.thumbnail = thumbnail;
        this.createdTime = createdTime;
    }

    public static ArticleCardResponse of(Article article) {
        return new ArticleCardResponse(
                article.getTitle(),
                article.getPrice(),
                article.getPhotos().pickThumbnail(),
                article.getCreatedTime().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME)
        );
    }

    public static List<ArticleCardResponse> listOf(List<Article> articles) {
        return articles.stream()
                .map(ArticleCardResponse::of)
                .collect(toList());
    }

    public String getTitle() {
        return title;
    }

    public Long getPrice() {
        return price;
    }

    public String getThumbnail() {
        return thumbnail;
    }

    public String getCreatedTime() {
        return createdTime;
    }
}
