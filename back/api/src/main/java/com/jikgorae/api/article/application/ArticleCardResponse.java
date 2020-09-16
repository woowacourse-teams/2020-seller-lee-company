package com.jikgorae.api.article.application;

import static java.util.stream.Collectors.*;

import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.IntStream;

import com.jikgorae.api.article.domain.Article;

public class ArticleCardResponse {
    private Long id;
    private String title;
    private Long price;
    private String thumbnail;
    private String tradeState;
    private long favoriteCount;
    private boolean favoriteState;
    private String createdTime;

    private ArticleCardResponse() {
    }

    private ArticleCardResponse(Long id, String title, Long price, String thumbnail,
            String tradeState, long favoriteCount, boolean favoriteState,
            String createdTime) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.thumbnail = thumbnail;
        this.tradeState = tradeState;
        this.favoriteCount = favoriteCount;
        this.favoriteState = favoriteState;
        this.createdTime = createdTime;
    }

    public static ArticleCardResponse of(Article article, Long favoriteCount,
            boolean favoriteState) {
        return new ArticleCardResponse(
                article.getId(),
                article.getTitle(),
                article.getPrice(),
                article.getPhotos().pickThumbnail(),
                article.getTradeState().getTradeStateName(),
                favoriteCount,
                favoriteState,
                article.getCreatedTime().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME)
        );
    }

    public static List<ArticleCardResponse> listOf(List<Article> articles,
            List<Long> favoriteCounts,
            List<Boolean> favoriteStates) {
        return IntStream.range(0, articles.size())
                .mapToObj(i -> of(articles.get(i), favoriteCounts.get(i), favoriteStates.get(i)))
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

    public String getTradeState() {
        return tradeState;
    }

    public long getFavoriteCount() {
        return favoriteCount;
    }

    public boolean isFavoriteState() {
        return favoriteState;
    }

    public String getCreatedTime() {
        return createdTime;
    }
}
