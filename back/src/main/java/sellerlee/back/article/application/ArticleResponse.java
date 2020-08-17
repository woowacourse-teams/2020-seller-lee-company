package sellerlee.back.article.application;

import java.time.LocalDateTime;
import java.util.List;

import sellerlee.back.article.domain.Article;

public class ArticleResponse {
    private Long id;
    private String title;
    private String categoryName;
    private String contents;
    private Long price;
    private String tradeState;
    private List<String> tags;
    private List<String> photos;
    private AuthorResponse author;
    private boolean favoriteState;
    private long favoriteCount;
    private LocalDateTime createdTime;

    private ArticleResponse() {
    }

    public ArticleResponse(Long id, String title, String categoryName, String contents,
            Long price, String tradeState, List<String> tags, List<String> photos,
            AuthorResponse author, boolean favoriteState, long favoriteCount,
            LocalDateTime createdTime) {
        this.id = id;
        this.title = title;
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

    public static ArticleResponse of(Article article, boolean favoriteState, long favoriteCount) {
        return new ArticleResponse(
                article.getId(),
                article.getTitle(),
                article.getCategory().getCategory(),
                article.getContents(),
                article.getPrice(),
                article.getTradeState().getTradeState(),
                article.getTags().getNames(),
                article.getPhotos().toList(),
                AuthorResponse.of(article.getAuthor()),
                favoriteState,
                favoriteCount,
                article.getCreatedTime()
        );
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
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

    public LocalDateTime getCreatedTime() {
        return createdTime;
    }
}
