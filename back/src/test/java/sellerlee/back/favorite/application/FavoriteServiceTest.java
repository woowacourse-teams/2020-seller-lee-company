package sellerlee.back.favorite.application;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import sellerlee.back.favorite.domain.Favorite;
import sellerlee.back.favorite.domain.FavoriteRepository;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static sellerlee.back.fixture.ArticleFixture.ARTICLE1;
import static sellerlee.back.fixture.MemberFixture.MEMBER1;

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
                new FavoriteCreateRequest(ARTICLE1.getId(), MEMBER1.getId()))).isEqualTo(1L);
    }

    @DisplayName("cancel 요청시 repository에 delete를 요청한다.")
    @Test
    void cancel() {
        Long favoriteId = 1L;

        favoriteService.cancel(favoriteId);
        verify(favoriteRepository).deleteById(1L);
    }
}