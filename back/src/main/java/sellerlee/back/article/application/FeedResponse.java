package sellerlee.back.article.application;

import static java.util.stream.Collectors.*;

import java.util.List;
import java.util.stream.IntStream;

import sellerlee.back.article.domain.Article;

public class FeedResponse {
    private Long id;
    private Long price;
    private Long favoriteCount;
    private boolean favoriteState;
    private List<String> tags;
    private List<String> photos;

    private FeedResponse() {
    }

    private FeedResponse(Long id, Long price, Long favoriteCount, boolean favoriteState,
            List<String> tags, List<String> photos) {
        this.id = id;
        this.price = price;
        this.favoriteCount = favoriteCount;
        this.favoriteState = favoriteState;
        this.tags = tags;
        this.photos = photos;
    }

    public static FeedResponse of(Article article, Long favoriteCount, boolean favoriteState) {
        return new FeedResponse(
                article.getId(),
                article.getPrice(),
                favoriteCount,
                favoriteState,
                article.getTags().getTagNames(),
                article.getPhotos().toList()
        );
    }

    public static List<FeedResponse> listOf(List<Article> articles, List<Long> favoriteCounts,
            List<Boolean> favoriteStates) {
        return IntStream.range(0, articles.size())
                .mapToObj(i -> of(articles.get(i), favoriteCounts.get(i), favoriteStates.get(i)))
                .collect(toList());
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

    public boolean getFavoriteState() {
        return favoriteState;
    }

    public List<String> getTags() {
        return tags;
    }

    public List<String> getPhotos() {
        return photos;
    }
}
