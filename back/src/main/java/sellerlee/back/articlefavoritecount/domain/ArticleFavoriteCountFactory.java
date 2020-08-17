package sellerlee.back.articlefavoritecount.domain;

import sellerlee.back.article.domain.Article;

public class ArticleFavoriteCountFactory {
    private static final long FIRST_FAVORITE_COUNT = 1L;

    private final Article article;

    public ArticleFavoriteCountFactory(Article article) {
        this.article = article;
    }

    public ArticleFavoriteCount createFirstCount() {
        return new ArticleFavoriteCount(article, FIRST_FAVORITE_COUNT);
    }
}
