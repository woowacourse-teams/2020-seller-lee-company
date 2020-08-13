package sellerlee.back.article.application;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.Mockito.*;
import static sellerlee.back.fixture.ArticleFixture.*;
import static sellerlee.back.fixture.FavoriteFixture.*;
import static sellerlee.back.fixture.MemberFixture.*;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import sellerlee.back.article.domain.ArticleRepository;
import sellerlee.back.article.domain.TradeState;
import sellerlee.back.favorite.domain.FavoriteRepository;

@ExtendWith(value = MockitoExtension.class)
class ArticleViewServiceTest {
    @Mock
    private FavoriteRepository favoriteRepository;

    @Mock
    private ArticleRepository articleRepository;

    private ArticleViewService articleViewService;

    @BeforeEach
    void setUp() {
        articleViewService = new ArticleViewService(articleRepository, favoriteRepository);
    }

    @DisplayName("Article 와 Member 를 가져온 후 객체들를 이용해 Favorite 객체를 가져온다")
    @Test
    void showArticle() {
        when(articleRepository.findById(ARTICLE1.getId())).thenReturn(Optional.of(ARTICLE1));
        when(favoriteRepository.findFavoriteByArticleAndMember(any(), any())).thenReturn(
                Optional.of(FAVORITE));

        ArticleResponse articleResponse = articleViewService.showArticle(ARTICLE1.getId(), MEMBER1);

        assertThat(articleResponse.getId()).isEqualTo(ARTICLE1.getId());
        assertThat(articleResponse.getAuthor().getNickname()).isEqualTo(MEMBER1.getNickname());
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