package sellerlee.back.favorite.presentation;

import static sellerlee.back.favorite.presentation.FavoriteController.*;

import java.net.URI;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import sellerlee.back.favorite.application.FavoriteRequest;
import sellerlee.back.favorite.application.FavoriteService;
import sellerlee.back.member.domain.Member;
import sellerlee.back.security.core.LoginMember;

@RestController
@RequestMapping(FAVORITE_URI)
public class FavoriteController {
    public static final String FAVORITE_URI = "/favorites";

    private final FavoriteService favoriteService;

    public FavoriteController(FavoriteService favoriteService) {
        this.favoriteService = favoriteService;
    }

    @PostMapping
    public ResponseEntity<Void> create(@RequestBody FavoriteRequest request,
            @LoginMember Member loginMember) {
        Long favoriteId = favoriteService.create(request, loginMember);

        return ResponseEntity
                .created(URI.create(FAVORITE_URI + "/" + favoriteId))
                .build();
    }

    @DeleteMapping
    public ResponseEntity<Void> remove(@RequestBody FavoriteRequest request,
            @LoginMember Member loginMember) {
        favoriteService.remove(request, loginMember);

        return ResponseEntity
                .noContent()
                .build();
    }
}