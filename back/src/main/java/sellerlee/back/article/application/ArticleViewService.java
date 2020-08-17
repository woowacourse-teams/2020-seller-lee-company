package sellerlee.back.article.application;

import static java.util.stream.Collectors.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import sellerlee.back.article.domain.Article;
import sellerlee.back.article.domain.ArticleRepository;
import sellerlee.back.articlefavoritecount.domain.ArticleFavoriteCount;
import sellerlee.back.articlefavoritecount.domain.ArticleFavoriteCountRepository;
import sellerlee.back.favorite.domain.Favorite;
import sellerlee.back.favorite.domain.FavoriteRepository;
import sellerlee.back.member.domain.Member;

@Service
public class ArticleViewService {
    public static final int FIRST_PAGE = 0;

    private final ArticleRepository articleRepository;
    private final ArticleFavoriteCountRepository articleFavoriteCountRepository;
    private final FavoriteRepository favoriteRepository;

    public ArticleViewService(ArticleRepository articleRepository,
            ArticleFavoriteCountRepository articleFavoriteCountRepository,
            FavoriteRepository favoriteRepository) {
        this.articleRepository = articleRepository;
        this.articleFavoriteCountRepository = articleFavoriteCountRepository;
        this.favoriteRepository = favoriteRepository;
    }

    @Transactional(readOnly = true)
    public ArticleResponse show(Long articleId, Member loginMember) {
        Article article = articleRepository.findById(articleId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 게시글입니다."));

        Optional<Favorite> favorite = favoriteRepository.findFavoriteByArticleAndMember(article,
                loginMember);

        long favoriteCount = favoriteRepository.countByArticle(article);

        return ArticleResponse.of(article, favorite.isPresent(), favoriteCount);
    }

    @Transactional(readOnly = true)
    public List<FeedResponse> showFeedPage(Long lastArticleId, int size, Member loginMember) {
        PageRequest pageRequest = PageRequest.of(FIRST_PAGE, size);

        List<Article> articles = articleRepository
                .findByIdLessThanOrderByIdDesc(lastArticleId, pageRequest)
                .getContent();
        List<Article> favorites = favoriteRepository.findAllByMemberAndArticleIn(loginMember,
                articles)
                .stream()
                .map(Favorite::getArticle)
                .collect(toList());
        Map<Article, Long> articleAndCount = articleFavoriteCountRepository
                .findAllByArticleInOrderByArticle(articles).stream()
                .collect(toMap(ArticleFavoriteCount::getArticle,
                        ArticleFavoriteCount::getFavoriteCount));

        List<Long> favoriteCounts = articles.stream()
                .map(article -> articleAndCount.getOrDefault(article, 0L))
                .collect(toList());
        List<Boolean> favoriteStates = articles.stream()
                .map(favorites::contains)
                .collect(toList());

        return FeedResponse.listOf(articles, favoriteCounts, favoriteStates);
    }

    // @Transactional(readOnly = true)
    // public List<ArticleResponse> showByTradeState(String state) {
    //     TradeState tradeState = TradeState.valueOf(state);
    //     List<Article> articles = articleRepository.findByTradeState(tradeState);
    //     return articles.stream()
    //             .map(ArticleResponse::of)
    //             .collect(Collectors.toList());
    // }
}
