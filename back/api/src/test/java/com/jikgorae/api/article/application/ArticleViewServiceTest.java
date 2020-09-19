package com.jikgorae.api.article.application;

import static com.jikgorae.api.article.acceptance.ArticleAcceptanceTest.*;
import static com.jikgorae.api.fixture.ArticleFixture.*;
import static com.jikgorae.api.fixture.ArticleOrganizationFixture.*;
import static com.jikgorae.api.fixture.FavoriteFixture.*;
import static com.jikgorae.api.fixture.MemberFixture.*;
import static com.jikgorae.api.fixture.OrganizationFixture.*;
import static java.util.Arrays.*;
import static java.util.Collections.*;
import static org.assertj.core.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;

import com.jikgorae.api.article.domain.Article;
import com.jikgorae.api.article.domain.ArticleRepository;
import com.jikgorae.api.article.domain.TradeState;
import com.jikgorae.api.articlefavoritecount.domain.ArticleFavoriteCount;
import com.jikgorae.api.articlefavoritecount.domain.ArticleFavoriteCountRepository;
import com.jikgorae.api.articleorganization.application.ArticleOrganizationService;
import com.jikgorae.api.favorite.domain.Favorite;
import com.jikgorae.api.favorite.domain.FavoriteRepository;

@ExtendWith(value = MockitoExtension.class)
class ArticleViewServiceTest {
    @Mock
    private ArticleFavoriteCountRepository articleFavoriteCountRepository;

    @Mock
    private ArticleRepository articleRepository;

    @Mock
    private ArticleOrganizationService articleOrganizationService;

    @Mock
    private FavoriteRepository favoriteRepository;

    private ArticleViewService articleViewService;

    @BeforeEach
    void setUp() {
        articleViewService = new ArticleViewService(articleRepository,
                articleFavoriteCountRepository, favoriteRepository, articleOrganizationService);
    }

    @DisplayName("Article 와 Member 를 가져온 후 객체들를 이용해 Favorite 객체와 조직 목록을 가져온다")
    @Test
    void showArticle() {
        when(articleRepository.findById(ARTICLE1.getId())).thenReturn(Optional.of(ARTICLE1));
        when(favoriteRepository.findFavoriteByArticleAndMember(any(), any()))
                .thenReturn(Optional.of(FAVORITE1));
        when(articleOrganizationService.showByArticleId(ARTICLE1.getId())).thenReturn(Arrays.asList(ARTICLE1_직고래));

        ArticleResponse articleResponse = articleViewService.show(ARTICLE1.getId(), MEMBER1);

        assertThat(articleResponse.getId()).isEqualTo(ARTICLE1.getId());
        assertThat(articleResponse.getAuthor().getNickname())
                .isEqualTo(MEMBER1.getNickname());
        assertThat(articleResponse.getOrganizations()).containsExactly(직고래);
    }

    @DisplayName("showPageByCategory()에서 마지막 글의 id와 가져올 size, category를 입력한 경우, category가 일치하며 입력한 id보다 작은 게시글 리스트 반환")
    @Test
    void showPageByCategory() {
        List<Article> articles = asList(ARTICLE2, ARTICLE1);
        List<Long> favoriteCounts = asList(1L, 2L);
        PageRequest pageRequest = PageRequest.of(ArticleViewService.FIRST_PAGE, ARTICLE_SIZE);
        Page<Article> expectedPage = new PageImpl<>(articles);

        when(articleRepository.findByIdLessThanAndCategoryOrderByIdDesc(LAST_ARTICLE_ID,
                ARTICLE2.getCategory(), pageRequest))
                .thenReturn(expectedPage);
        when(articleFavoriteCountRepository.findAllByArticleInOrderByArticle(articles))
                .thenReturn(asList(
                        new ArticleFavoriteCount(1L, articles.get(0), favoriteCounts.get(0)),
                        new ArticleFavoriteCount(2L, articles.get(1), favoriteCounts.get(1))));
        when(favoriteRepository.findAllByMemberAndArticleIn(MEMBER1, articles))
                .thenReturn(singletonList(new Favorite(1L, articles.get(0), MEMBER1)));
        List<ArticleCardResponse> actualArticles = articleViewService
                .showPageByCategory(LAST_ARTICLE_ID, ARTICLE_SIZE,
                        ARTICLE1.getCategory().getCategoryName(), MEMBER1);

        assertThat(actualArticles.get(0).getId()).isEqualTo(ARTICLE2.getId());
        assertThat(actualArticles.get(0).getFavoriteCount()).isEqualTo(favoriteCounts.get(0));
        assertThat(actualArticles.get(1).getId()).isEqualTo(ARTICLE1.getId());
        assertThat(actualArticles.get(1).getFavoriteCount()).isEqualTo(favoriteCounts.get(1));
    }

    @DisplayName("tradeState가 판매완료인 경우 판매 완료된 게시글을 반환")
    @Test
    void showSalesDetailsInCaseCompleted() {
        String tradeState = "COMPLETED";
        when(articleRepository.findAllByAuthorAndTradeState(MEMBER1, TradeState.COMPLETED))
                .thenReturn(Collections.singletonList(ARTICLE3));

        List<ArticleCardResponse> responses = articleViewService.showByTradeState(
                MEMBER1, tradeState);

        assertThat(responses).hasSize(1);
    }

    @DisplayName("tradeState가 판매완료가 아닌 경우 판매중, 예약중인 게시글 반환")
    @Test
    void showSalesDetailsInCaseNotCompleted() {
        String tradeState = "ON_SALE";
        List<Article> articles = asList(ARTICLE1, ARTICLE2, ARTICLE3);
        when(articleRepository.findAllByAuthorAndTradeStateNot(MEMBER1, TradeState.COMPLETED))
                .thenReturn(articles);

        List<ArticleCardResponse> responses = articleViewService.showByTradeState(MEMBER1,
                tradeState);

        assertThat(responses).hasSize(3);
    }
}
