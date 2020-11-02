package com.jikgorae.api.favorite.presentation;

import static com.jikgorae.api.favorite.presentation.FavoriteController.*;

import java.net.URI;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jikgorae.api.article.application.ArticleCardResponse;
import com.jikgorae.api.favorite.application.FavoriteRequest;
import com.jikgorae.api.favorite.application.FavoriteService;
import com.jikgorae.api.favorite.query.FavoriteDao;
import com.jikgorae.api.member.domain.Member;
import com.jikgorae.api.security.core.LoginMember;

@RestController
@RequestMapping(FAVORITE_API_URI)
public class FavoriteController {
    public static final String FAVORITE_API_URI = "/api/favorites";

    private final FavoriteService favoriteService;
    private final FavoriteDao favoriteDao;

    public FavoriteController(FavoriteService favoriteService,
            FavoriteDao favoriteDao) {
        this.favoriteService = favoriteService;
        this.favoriteDao = favoriteDao;
    }

    @GetMapping
    public ResponseEntity<List<ArticleCardResponse>> showFavorites(
            @LoginMember Member loginMember) {
        List<ArticleCardResponse> responses = favoriteDao.showFavorites(loginMember);
        return ResponseEntity.ok(responses);
    }

    @PostMapping
    public ResponseEntity<Void> create(@RequestBody FavoriteRequest request,
            @LoginMember Member loginMember) {
        Long favoriteId = favoriteService.create(request, loginMember);

        return ResponseEntity
                .created(URI.create(FAVORITE_API_URI + "/" + favoriteId))
                .build();
    }

    @DeleteMapping
    public ResponseEntity<Void> remove(@RequestBody FavoriteRequest request,
            @LoginMember Member loginMember) {
        favoriteService.delete(request, loginMember);

        return ResponseEntity
                .noContent()
                .build();
    }
}