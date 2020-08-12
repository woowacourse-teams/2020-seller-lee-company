package sellerlee.back.favorite.application;

import sellerlee.back.article.domain.Article;
import sellerlee.back.favorite.domain.Favorite;
import sellerlee.back.member.domain.Member;

public class FavoriteRequest {
    private Long articleId;

    private FavoriteRequest() {
    }

    public FavoriteRequest(Long articleId) {
        this.articleId = articleId;
    }

    public Long getArticleId() {
        return articleId;
    }
}
