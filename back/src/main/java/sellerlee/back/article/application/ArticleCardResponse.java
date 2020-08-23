package sellerlee.back.article.application;

import static java.util.stream.Collectors.*;

import java.time.format.DateTimeFormatter;
import java.util.List;

import sellerlee.back.article.domain.Article;

public class ArticleCardResponse {
    private Long id;
    private String title;
    private Long price;
    private String thumbnail;
    private long favoriteCount;
    private String createdTime;

    private ArticleCardResponse() {
    }

    public ArticleCardResponse(Long id, String title, Long price, String thumbnail,
            long favoriteCount,
            String createdTime) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.thumbnail = thumbnail;
        this.favoriteCount = favoriteCount;
        this.createdTime = createdTime;
    }

    public static ArticleCardResponse of(Article article) {
        return new ArticleCardResponse(
                article.getId(),
                article.getTitle(),
                article.getPrice(),
                article.getPhotos().pickThumbnail(),
                7, // TODO : 실제 값으로 변경
                article.getCreatedTime().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME)
        );
    }

    public static List<ArticleCardResponse> listOf(List<Article> articles) {
        return articles.stream()
                .map(ArticleCardResponse::of)
                .collect(toList());
    }

    public Long getId() {
        return id;
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

    public long getFavoriteCount() {
        return favoriteCount;
    }

    public String getCreatedTime() {
        return createdTime;
    }
}
