package sellerlee.back.favorite.application;

import sellerlee.back.article.domain.Article;
import sellerlee.back.favorite.domain.Favorite;
import sellerlee.back.member.domain.Member;

public class FavoriteCreateRequest {
    private Long articleId;
    private Long memberId;

    private FavoriteCreateRequest() {
    }

    public FavoriteCreateRequest(Long articleId, Long memberId) {
        this.articleId = articleId;
        this.memberId = memberId;
    }

    public Favorite toFavorite() {
        return new Favorite(new Article(articleId), new Member(memberId));
    }

    public Long getArticleId() {
        return articleId;
    }

    public Long getMemberId() {
        return memberId;
    }
}
