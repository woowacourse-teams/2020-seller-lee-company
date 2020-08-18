package sellerlee.back.favorite.application;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import sellerlee.back.article.domain.Article;
import sellerlee.back.favorite.domain.Favorite;
import sellerlee.back.favorite.domain.FavoriteRepository;
import sellerlee.back.member.domain.Member;

@Service
public class FavoriteService {
    private final FavoriteRepository favoriteRepository;

    public FavoriteService(FavoriteRepository favoriteRepository) {
        this.favoriteRepository = favoriteRepository;
    }

    @Transactional
    public Long create(FavoriteRequest request, Member loginMember) {
        Favorite favorite = new Favorite(new Article(request.getArticleId()), loginMember);
        Favorite saved = favoriteRepository.save(favorite.create());

        return saved.getId();
    }

    @Transactional
    public void remove(FavoriteRequest request, Member loginMember) {
        Favorite favorite = new Favorite(new Article(request.getArticleId()), loginMember);
        favoriteRepository.save(favorite.remove());
        favoriteRepository.deleteByMemberIdAndArticleId(loginMember.getId(),
                request.getArticleId());
    }
}
