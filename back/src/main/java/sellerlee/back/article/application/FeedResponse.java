/**
 * @author begaonnuri
 */

package sellerlee.back.article.application;

import static java.util.stream.Collectors.*;

import java.util.List;

import sellerlee.back.article.domain.Article;
import sellerlee.back.article.domain.Tag;

public class FeedResponse {
    private Long id;
    private Long price;
    private int favoriteCount;
    private List<Tag> tags;
    private List<String> photos;

    private FeedResponse() {
    }

    private FeedResponse(Long id, Long price, int favoriteCount,
            List<Tag> tags, List<String> photos) {
        this.id = id;
        this.price = price;
        this.favoriteCount = favoriteCount;
        this.tags = tags;
        this.photos = photos;
    }

    public static FeedResponse of(Article article) {
        return new FeedResponse(
                article.getId(),
                article.getPrice(),
                10,
                article.getTags().getTags(),
                article.getPhotos().getPhotos()
        );
    }

    public static List<FeedResponse> listOf(List<Article> articles) {
        return articles.stream()
                .map(FeedResponse::of)
                .collect(toList());
    }

    public Long getId() {
        return id;
    }

    public Long getPrice() {
        return price;
    }

    public int getFavoriteCount() {
        return favoriteCount;
    }

    public List<Tag> getTags() {
        return tags;
    }

    public List<String> getPhotos() {
        return photos;
    }
}
