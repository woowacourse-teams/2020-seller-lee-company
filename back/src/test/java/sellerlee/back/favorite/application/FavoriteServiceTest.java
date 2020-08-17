package sellerlee.back.favorite.application;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;
import static sellerlee.back.fixture.ArticleFixture.*;
import static sellerlee.back.fixture.MemberFixture.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import sellerlee.back.favorite.domain.Favorite;
import sellerlee.back.favorite.domain.FavoriteRepository;

@ExtendWith(value = MockitoExtension.class)
class FavoriteServiceTest {
    @Mock
    private FavoriteRepository favoriteRepository;

    private FavoriteService favoriteService;

    @BeforeEach
    void setUp() {
        favoriteService = new FavoriteService(favoriteRepository);
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
