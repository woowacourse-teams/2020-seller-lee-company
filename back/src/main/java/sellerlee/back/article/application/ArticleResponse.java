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
    private String tradeState;
    private List<String> photos;
    private MemberResponse author;
    private boolean favoriteState;
    private long favoriteCount;
    private LocalDateTime createdTime;

    private ArticleResponse() {
    }

    private ArticleResponse(Long id, String title, String category, String contents,
            Long price, String tradeState, List<String> photos, MemberResponse author, boolean favoriteState, long favoriteCount,
            LocalDateTime createdTime) {
        this.id = id;
        this.title = title;
        this.category = category;
        this.contents = contents;
        this.price = price;
        this.tradeState = tradeState;
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
                article.getPhotos().getPhotos(),
                MemberResponse.of(article.getAuthor()),
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

    public String getCategory() {
        return category;
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

    public List<String> getPhotos() {
        return photos;
    }

    public MemberResponse getAuthor() {
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
