package com.jikgorae.api.article.application;

import java.time.format.DateTimeFormatter;
import java.util.List;

import com.jikgorae.api.article.domain.Article;
import com.jikgorae.api.organization.domain.Organization;

public class ArticleResponse {
    private Long id;
    private String title;
    private List<Organization> organizations;
    private String categoryName;
    private String contents;
    private Long price;
    private String tradeState;
    private List<String> tags;
    private List<String> photos;
    private AuthorResponse author;
    private boolean favoriteState;
    private long favoriteCount;
    private String createdTime;

    private ArticleResponse() {
    }

    private ArticleResponse(Long id, String title, List<Organization> organizations,
            String categoryName, String contents, Long price,
            String tradeState, List<String> tags, List<String> photos, AuthorResponse author,
            boolean favoriteState, long favoriteCount, String createdTime) {
        this.id = id;
        this.title = title;
        this.organizations = organizations;
        this.categoryName = categoryName;
        this.contents = contents;
        this.price = price;
        this.tradeState = tradeState;
        this.tags = tags;
        this.photos = photos;
        this.author = author;
        this.favoriteState = favoriteState;
        this.favoriteCount = favoriteCount;
        this.createdTime = createdTime;
    }

    public static ArticleResponse of(Article article, List<Organization> organizations,
            boolean favoriteState, long favoriteCount) {
        return new ArticleResponse(
                article.getId(),
                article.getTitle(),
                organizations,
                article.getCategory().getCategoryName(),
                article.getContents(),
                article.getPrice(),
                article.getTradeState().getTradeStateName(),
                article.getTags().getTagNames(),
                article.getPhotos().toList(),
                AuthorResponse.of(article.getAuthor()),
                favoriteState,
                favoriteCount,
                article.getCreatedTime().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME)
        );
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public List<Organization> getOrganizations() {
        return organizations;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public String getContents() {
        return contents;
    }

    public Long getPrice() {
        return price;
    }

    public String getTradeState() {
        return tradeState;
    }

    public List<String> getTags() {
        return tags;
    }

    public List<String> getPhotos() {
        return photos;
    }

    public AuthorResponse getAuthor() {
        return author;
    }

    public boolean getFavoriteState() {
        return favoriteState;
    }

    public long getFavoriteCount() {
        return favoriteCount;
    }

    public String getCreatedTime() {
        return createdTime;
    }
}
