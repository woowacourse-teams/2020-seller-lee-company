package sellerlee.back.article.application;

import static java.util.stream.Collectors.*;

import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import sellerlee.back.article.domain.Article;
import sellerlee.back.article.domain.ArticleRepository;
import sellerlee.back.article.domain.TradeState;
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

    public ArticleResponse show(Long articleId, Member loginMember) {
        Article article = articleRepository.findById(articleId)
                .orElseThrow(() -> new NoSuchElementException("조회할 게시글이 존재하지 않습니다."));
        Optional<Favorite> favorite = favoriteRepository.findFavoriteByArticleAndMember(article,
                loginMember);
        long favoriteCount = favoriteRepository.countByArticle(article);

        return ArticleResponse.of(article, favorite.isPresent(), favoriteCount);
    }

    public List<FeedResponse> showPage(Long lastArticleId, int size, Member loginMember) {
        PageRequest pageRequest = PageRequest.of(FIRST_PAGE, size);

        List<Article> articles = articleRepository
                .findByIdLessThanOrderByIdDesc(lastArticleId, pageRequest)
                .getContent();
        Map<Article, Long> articleAndCount = articleFavoriteCountRepository
                .findAllByArticleInOrderByArticle(articles).stream()
                .collect(toMap(ArticleFavoriteCount::getArticle,
                        ArticleFavoriteCount::getFavoriteCount));

        List<Long> favoriteCounts = articles.stream()
                .map(article -> articleAndCount.getOrDefault(article, 0L))
                .collect(toList());

        List<Article> favorites = favoriteRepository.findAllByMemberAndArticleIn(loginMember,
                articles)
                .stream()
                .map(Favorite::getArticle)
                .collect(toList());
        List<Boolean> favoriteStates = articles.stream()
                .map(favorites::contains)
                .collect(toList());

        return FeedResponse.listOf(articles, favoriteCounts, favoriteStates);
    }

    public List<SalesHistoryResponse> showByTradeState(Member member, String tradeState) {
        if (TradeState.valueOf(tradeState).isCompleted()) {
            List<Article> articles = getCompletedStateArticleBy(member);
            return getSalesHistoryResponse(articles);
        }
        List<Article> articles = getNotCompletedStateArticleBy(member);
        return getSalesHistoryResponse(articles);
    }

    private List<Article> getNotCompletedStateArticleBy(Member member) {
        return articleRepository.findAllByAuthorAndTradeStateNot(member, TradeState.COMPLETED);
    }

    private List<Article> getCompletedStateArticleBy(Member member) {
        return articleRepository.findAllByAuthorAndTradeState(member, TradeState.COMPLETED);
    }

    private List<SalesHistoryResponse> getSalesHistoryResponse(List<Article> articles) {
        return articles.stream()
                .map(article -> SalesHistoryResponse.of(article,
                        favoriteRepository.countAllByArticle(article)))
                .collect(Collectors.toList());
    }

    public List<ArticleCardResponse> showFavorites(Member member) {
        List<Favorite> favorites = favoriteRepository.findAllByMemberId(member.getId());

        List<Long> favoriteArticleIds = favorites.stream()
                .map(Favorite::getArticle)
                .map(Article::getId)
                .collect(toList());

        List<Article> favoriteArticles = articleRepository.findAllById(favoriteArticleIds);

        return ArticleCardResponse.listOf(favoriteArticles);
    }
}
