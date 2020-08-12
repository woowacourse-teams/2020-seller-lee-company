package sellerlee.back.favorite.application;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;
import sellerlee.back.favorite.domain.Favorite;
import sellerlee.back.favorite.domain.FavoriteRepository;

@Service
public class FavoriteService {
    private final FavoriteRepository favoriteRepository;

    public FavoriteService(FavoriteRepository favoriteRepository) {
        this.favoriteRepository = favoriteRepository;
    }

    @Transactional
    public Long create(FavoriteCreateRequest request) {
        Favorite favorite = favoriteRepository.save(request.toFavorite());
        favorite.create();
        return favorite.getId();
    }

    public void cancel(Long favoriteId) {
        favoriteRepository.deleteById(favoriteId);
    }
}
