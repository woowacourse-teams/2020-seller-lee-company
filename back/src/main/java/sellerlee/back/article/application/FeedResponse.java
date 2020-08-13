/**
 * @author kouz95
 */

package sellerlee.back.article.application;

import java.util.ArrayList;
import java.util.List;

import sellerlee.back.article.domain.Article;
import sellerlee.back.article.domain.Tag;

public class FeedResponse {
    private Long id;
    private Long price;
    private Long favoriteCount;
    private Boolean favoriteState;
    private List<Tag> tags;
    private List<String> photos;

    private FeedResponse() {
    }

    private FeedResponse(Long id, Long price, Long favoriteCount, Boolean favoriteState,
            List<Tag> tags, List<String> photos) {
        this.id = id;
        this.price = price;
        this.favoriteCount = favoriteCount;
        this.favoriteState = favoriteState;
        this.tags = tags;
        this.photos = photos;
    }

    public static FeedResponse of(Article article, Long favoriteCount, Boolean favoriteState) {
        return new FeedResponse(
                article.getId(),
                article.getPrice(),
                favoriteCount,
                favoriteState,
                article.getTags().toList(),
                article.getPhotos().toList()
        );
    }

    public static List<FeedResponse> listOf(List<Article> articles, List<Long> favoriteCounts,
            List<Boolean> favoriteStates) {
        List<FeedResponse> responses = new ArrayList<>();
        for (int i = 0; i < articles.size(); i++) {
            responses.add(
                    FeedResponse.of(articles.get(i), favoriteCounts.get(i), favoriteStates.get(i)));
        }
        return responses;
    }

    public Long getId() {
        return id;
    }

    public Long getPrice() {
        return price;
    }

    public Long getFavoriteCount() {
        return favoriteCount;
    }

    public Boolean getFavoriteState() {
        return favoriteState;
    }

    public List<Tag> getTags() {
        return tags;
    }

    public List<String> getPhotos() {
        return photos;
    }
}
