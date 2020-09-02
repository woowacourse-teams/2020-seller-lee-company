package sellerlee.back.favorite.application;

import static java.util.Collections.*;
import static org.assertj.core.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;
import static sellerlee.back.fixture.ArticleFixture.*;
import static sellerlee.back.fixture.FavoriteFixture.*;
import static sellerlee.back.fixture.MemberFixture.*;

import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import sellerlee.back.article.application.ArticleCardResponse;
import sellerlee.back.article.application.ArticleViewService;
import sellerlee.back.article.domain.ArticleRepository;
import sellerlee.back.articlefavoritecount.domain.ArticleFavoriteCountRepository;
import sellerlee.back.favorite.domain.Favorite;
import sellerlee.back.favorite.domain.FavoriteRepository;

@ExtendWith(value = MockitoExtension.class)
class FavoriteServiceTest {
    @Mock
    private FavoriteRepository favoriteRepository;

    @Mock
    private ArticleRepository articleRepository;

    @Mock
    private ArticleFavoriteCountRepository articleFavoriteCountRepository;

    private ArticleViewService articleViewService;

    private FavoriteService favoriteService;

    @BeforeEach
    void setUp() {
        articleViewService = new ArticleViewService(articleRepository,
                articleFavoriteCountRepository, favoriteRepository);
        favoriteService = new FavoriteService(favoriteRepository, articleViewService);
    }

    @DisplayName("Member가 찜하고 있는 게시글 반환")
    @Test
    void showFavorites() {
        when(favoriteRepository.findAllByMemberId(MEMBER1.getId())).thenReturn(
                singletonList(FAVORITE1));
        when(articleRepository.findAllById(singletonList(FAVORITE1.getId()))).thenReturn(
                singletonList(ARTICLE1));

        List<ArticleCardResponse> responses = favoriteService.showFavorites(MEMBER1);

        assertThat(responses.get(0).getId()).isEqualTo(ARTICLE1.getId());
    }

    @DisplayName("create 요청시 Id가 생성된다.")
    @Test
    void create() {
        when(favoriteRepository.save(any())).thenReturn(new Favorite(1L, ARTICLE1, MEMBER1));

        assertThat(favoriteService.create(
                new FavoriteRequest(ARTICLE1.getId()), MEMBER1)).isEqualTo(1L);
    }

    @DisplayName("cancel 요청시 repository에 delete를 요청한다.")
    @Test
    void cancel() {
        favoriteService.remove(new FavoriteRequest(ARTICLE1.getId()), MEMBER1);

        verify(favoriteRepository).deleteByMemberIdAndArticleId(ARTICLE1.getId(), MEMBER1.getId());
    }
}
