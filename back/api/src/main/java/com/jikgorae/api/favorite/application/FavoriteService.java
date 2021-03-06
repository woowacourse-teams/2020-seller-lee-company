package com.jikgorae.api.favorite.application;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jikgorae.api.article.application.ArticleCardResponse;
import com.jikgorae.api.article.application.ArticleViewService;
import com.jikgorae.api.article.domain.Article;
import com.jikgorae.api.favorite.domain.Favorite;
import com.jikgorae.api.favorite.domain.FavoriteRepository;
import com.jikgorae.api.member.domain.Member;

@Service
public class FavoriteService {
    private final FavoriteRepository favoriteRepository;

    public FavoriteService(FavoriteRepository favoriteRepository) {
        this.favoriteRepository = favoriteRepository;
    }

    @Transactional
    public Long create(FavoriteRequest request, Member loginMember) {
        Favorite favorite = new Favorite(new Article(request.getArticleId()), loginMember);
        return favoriteRepository.save(favorite.create()).getId();
    }

    @Transactional
    public void delete(FavoriteRequest request, Member loginMember) {
        Favorite favorite = new Favorite(new Article(request.getArticleId()), loginMember);
        favoriteRepository.save(favorite.delete());
        favoriteRepository.deleteByMemberIdAndArticleId(loginMember.getId(), request.getArticleId());
    }

    public void deleteAllByArticleId(Long id) {
        favoriteRepository.deleteAllByArticleId(id);
    }
}
