package sellerlee.back.article.application;

import static java.util.Arrays.*;
import static java.util.Collections.*;
import static org.assertj.core.api.Assertions.*;
import static org.mockito.Mockito.*;
import static sellerlee.back.article.acceptance.ArticleAcceptanceTest.*;
import static sellerlee.back.article.application.ArticleViewService.*;
import static sellerlee.back.fixture.ArticleFixture.*;
import static sellerlee.back.fixture.FavoriteFixture.*;
import static sellerlee.back.fixture.MemberFixture.*;

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

import sellerlee.back.article.domain.Article;
import sellerlee.back.article.domain.ArticleRepository;
import sellerlee.back.articlefavoritecount.domain.ArticleFavoriteCount;
import sellerlee.back.articlefavoritecount.domain.ArticleFavoriteCountRepository;
import sellerlee.back.favorite.domain.Favorite;
import sellerlee.back.favorite.domain.FavoriteRepository;

@ExtendWith(value = MockitoExtension.class)
class ArticleViewServiceTest {
    @Mock
    private ArticleFavoriteCountRepository articleFavoriteCountRepository;

    @Mock
    private ArticleRepository articleRepository;

    @Mock
    private FavoriteRepository favoriteRepository;

    private ArticleViewService articleViewService;

    @BeforeEach
    void setUp() {
        articleViewService = new ArticleViewService(articleRepository,
                articleFavoriteCountRepository, favoriteRepository);
    }

    @DisplayName("Article 와 Member 를 가져온 후 객체들를 이용해 Favorite 객체를 가져온다")
    @Test
    void showArticle() {
        when(articleRepository.findById(ARTICLE1.getId())).thenReturn(Optional.of(ARTICLE1));
        when(favoriteRepository.findFavoriteByArticleAndMember(any(), any()))
                .thenReturn(Optional.of(FAVORITE));

        ArticleResponse articleResponse = articleViewService.show(ARTICLE1.getId(), MEMBER1);

        assertThat(articleResponse.getId()).isEqualTo(ARTICLE1.getId());
        assertThat(articleResponse.getAuthor().getNickname())
                .isEqualTo(MEMBER1.getNickname());
    }

    @DisplayName("showArticlePages()에서 마지막 글의 id와 가져올 size를 입력한 경우 입력한 id보다 작은 게시글 리스트 반환")
    @Test
    void showArticlePages() {
        List<Article> articles = asList(ARTICLE2, ARTICLE1);
        List<Long> favoriteCounts = asList(1L, 2L);
        PageRequest pageRequest = PageRequest.of(FIRST_PAGE, ARTICLE_SIZE);
        Page<Article> expectedPage = new PageImpl<>(articles);

        when(articleRepository.findByIdLessThanOrderByIdDesc(LAST_ARTICLE_ID, pageRequest))
                .thenReturn(expectedPage);
        when(articleFavoriteCountRepository.findAllByArticleInOrderByArticle(articles))
                .thenReturn(asList(
                        new ArticleFavoriteCount(1L, articles.get(0), favoriteCounts.get(0)),
                        new ArticleFavoriteCount(2L, articles.get(1), favoriteCounts.get(1))));
        when(favoriteRepository.findAllByMemberAndArticleIn(MEMBER1, articles))
                .thenReturn(singletonList(new Favorite(1L, articles.get(0), MEMBER1)));
        List<FeedResponse> actualArticles = articleViewService
                .showFeedPage(LAST_ARTICLE_ID, ARTICLE_SIZE, MEMBER1);

        assertThat(actualArticles.get(0).getId()).isEqualTo(ARTICLE2.getId());
        assertThat(actualArticles.get(0).getFavoriteCount()).isEqualTo(favoriteCounts.get(0));
        assertThat(actualArticles.get(0).getFavoriteState()).isTrue();
        assertThat(actualArticles.get(1).getId()).isEqualTo(ARTICLE1.getId());
        assertThat(actualArticles.get(1).getFavoriteCount()).isEqualTo(favoriteCounts.get(1));
        assertThat(actualArticles.get(1).getFavoriteState()).isFalse();
    }

    @DisplayName("Member 의 article 을 tradeState 에 따라 다르게 가져온다 - 판매 완료 일 경우")
    @Test
    void showSalesDetailsInCaseCompleted() {
        when(articleRepository.findAllByAuthorAndTradeState(any(), any())).thenReturn(
                Collections.singletonList(
                        ARTICLE3
                ));

        List<SalesHistoryResponse> salesHistoryRespons = articleViewService.showSalesDetails(
                MEMBER1, "판매 완료");

        assertThat(salesHistoryRespons).hasSize(1);
    }

    @DisplayName("Member 의 article 을 tradeState 에 따라 다르게 가져온다 - 판매 완료 일 경우")
    @Test
    void showSalesDetailsInCaseNotCompleted() {
        when(articleRepository.findAllByAuthorAndTradeStateNot(any(), any())).thenReturn(
                Arrays.asList(
                        ARTICLE1, ARTICLE2, ARTICLE3
                ));

        List<SalesHistoryResponse> salesHistoryRespons = articleViewService.showSalesDetails(
                MEMBER1, "예약중|판매중");

        assertThat(salesHistoryRespons).hasSize(3);
    }
    // @DisplayName("판매 상태로 게시글을 요청한 경우 해당 상태의 게시글 반환")
    // @Test
    // void showArticlesByTradeState() {
    //     String tradeState = "ON_SALE";
    //     when(articleRepository.findByTradeState(TradeState.valueOf(tradeState))).thenReturn(
    //             Arrays.asList(ARTICLE1, ARTICLE2)
    //     );
    //
    //     List<ArticleResponse> responses = articleViewService.showByTradeState(tradeState);
    //
    //     assertThat(responses.get(0).getId()).isEqualTo(ARTICLE1.getId());
    //     assertThat(responses.get(1).getId()).isEqualTo(ARTICLE2.getId());
    // }
}