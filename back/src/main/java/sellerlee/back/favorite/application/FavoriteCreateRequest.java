package sellerlee.back.favorite.application;

public class FavoriteCreateRequest {
    private Long articleId;
    private Long memberId;

    private FavoriteCreateRequest() {
    }

    public FavoriteCreateRequest(Long articleId, Long memberId) {
        this.articleId = articleId;
        this.memberId = memberId;
    }

    public Long getArticleId() {
        return articleId;
    }

    public Long getMemberId() {
        return memberId;
    }
}
