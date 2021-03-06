package com.jikgorae.api.article.application;

import static java.util.stream.Collectors.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.jikgorae.api.article.domain.Article;
import com.jikgorae.api.article.domain.ArticleRepository;
import com.jikgorae.api.article.domain.Category;
import com.jikgorae.api.article.domain.TradeState;
import com.jikgorae.api.article.exception.ArticleNotFoundException;
import com.jikgorae.api.articlefavoritecount.domain.ArticleFavoriteCount;
import com.jikgorae.api.articlefavoritecount.domain.ArticleFavoriteCountRepository;
import com.jikgorae.api.articleorganization.application.ArticleOrganizationService;
import com.jikgorae.api.articleorganization.domain.ArticleOrganization;
import com.jikgorae.api.favorite.domain.Favorite;
import com.jikgorae.api.favorite.domain.FavoriteRepository;
import com.jikgorae.api.member.domain.Member;
import com.jikgorae.api.organization.domain.Organization;

@Service
public class ArticleViewService {
    public static final int FIRST_PAGE = 0;

    private final ArticleRepository articleRepository;
    private final ArticleFavoriteCountRepository articleFavoriteCountRepository;
    private final FavoriteRepository favoriteRepository;
    private final ArticleOrganizationService articleOrganizationService;

    public ArticleViewService(ArticleRepository articleRepository,
            ArticleFavoriteCountRepository articleFavoriteCountRepository,
            FavoriteRepository favoriteRepository,
            ArticleOrganizationService articleOrganizationService) {
        this.articleRepository = articleRepository;
        this.articleFavoriteCountRepository = articleFavoriteCountRepository;
        this.favoriteRepository = favoriteRepository;
        this.articleOrganizationService = articleOrganizationService;
    }

    public ArticleResponse show(Long articleId, Member loginMember) {
        Article article = findArticleBy(articleId);
        Optional<Favorite> favorite = favoriteRepository.findFavoriteByArticleAndMember(article,
                loginMember);
        long favoriteCount = favoriteRepository.countByArticle(article);

        List<ArticleOrganization> articleOrganizations = articleOrganizationService.showByArticleId(
                articleId);
        List<Organization> organizations = articleOrganizations.stream()
                .map(ArticleOrganization::getOrganization)
                .collect(toList());
        return ArticleResponse.of(article, organizations, favorite.isPresent(), favoriteCount);
    }

    public Article show(Long articleId) {
        return articleRepository.findById(articleId)
                .orElseThrow(() -> new ArticleNotFoundException(articleId));
    }

    public Article findArticleBy(Long articleId) {
        return articleRepository.findById(articleId)
                .orElseThrow(() -> new ArticleNotFoundException(articleId));
    }

    public List<ArticleCardResponse> showPageByCategory(Long lastArticleId, int size,
            String category,
            Member loginMember) {
        PageRequest pageRequest = PageRequest.of(FIRST_PAGE, size);

        List<Article> articles = articleRepository
                .findByIdLessThanAndCategoryOrderByIdDesc(lastArticleId,
                        Category.fromString(category), pageRequest).getContent();

        return toArticleCardResponses(loginMember, articles);
    }

    private List<ArticleCardResponse> toArticleCardResponses(Member loginMember,
            List<Article> articles) {
        Map<Article, Long> articleAndFavoriteCount = toArticleAndFavoriteCount(articles);
        List<Long> favoriteCounts = toFavoriteCounts(articles, articleAndFavoriteCount);
        List<Article> favorites = toFavorites(loginMember, articles);
        List<Boolean> favoriteStates = toFavoriteStates(articles, favorites);

        return ArticleCardResponse.listOf(articles, favoriteCounts, favoriteStates);
    }

    private Map<Article, Long> toArticleAndFavoriteCount(List<Article> articles) {
        return articleFavoriteCountRepository
                .findAllByArticleInOrderByArticle(articles).stream()
                .collect(toMap(ArticleFavoriteCount::getArticle,
                        ArticleFavoriteCount::getFavoriteCount));
    }

    private List<Long> toFavoriteCounts(List<Article> articles,
            Map<Article, Long> articleAndFavoriteCount) {
        return articles.stream()
                .map(article -> articleAndFavoriteCount.getOrDefault(article, 0L))
                .collect(toList());
    }

    private List<Article> toFavorites(Member loginMember, List<Article> articles) {
        return favoriteRepository.findAllByMemberAndArticleIn(loginMember, articles)
                .stream()
                .map(Favorite::getArticle)
                .collect(toList());
    }

    private List<Boolean> toFavoriteStates(List<Article> articles, List<Article> favorites) {
        return articles.stream()
                .map(favorites::contains)
                .collect(toList());
    }

    public List<ArticleCardResponse> showByTradeState(Member loginMember, String tradeState) {
        if (TradeState.valueOf(tradeState).isCompleted()) {
            List<Article> articles = articleRepository.findAllByAuthorAndTradeState(loginMember,
                    TradeState.COMPLETED);
            return toArticleCardResponses(loginMember, articles);
        }
        List<Article> articles = articleRepository.findAllByAuthorAndTradeStateNot(loginMember,
                TradeState.COMPLETED);
        return toArticleCardResponses(loginMember, articles);
    }
}

