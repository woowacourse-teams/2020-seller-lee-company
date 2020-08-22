package sellerlee.back.article.presentation;

import static sellerlee.back.article.presentation.ArticleController.*;
import static sellerlee.back.favorite.presentation.FavoriteController.*;

import java.net.URI;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import sellerlee.back.article.application.ArticleCardResponse;
import sellerlee.back.article.application.ArticleRequest;
import sellerlee.back.article.application.ArticleResponse;
import sellerlee.back.article.application.ArticleService;
import sellerlee.back.article.application.ArticleViewService;
import sellerlee.back.article.application.FeedResponse;
import sellerlee.back.article.application.SalesHistoryResponse;
import sellerlee.back.article.application.TradeStateRequest;
import sellerlee.back.member.domain.Member;
import sellerlee.back.security.core.LoginMember;

@RestController
@RequestMapping(ARTICLE_URI)
public class ArticleController {
    public static final String ARTICLE_URI = "/articles";
    public static final String TRADE_STATE_URI = "/trade-state";

    private final ArticleService articleService;
    private final ArticleViewService articleViewService;

    public ArticleController(ArticleService articleService, ArticleViewService articleViewService) {
        this.articleService = articleService;
        this.articleViewService = articleViewService;
    }

    @PostMapping
    public ResponseEntity<Void> create(@RequestBody ArticleRequest request,
            @LoginMember Member loginMember) {
        Long articleId = articleService.create(request, loginMember);
        return ResponseEntity
                .created(URI.create(ARTICLE_URI + "/" + articleId))
                .build();
    }

    @GetMapping
    public ResponseEntity<List<FeedResponse>> showPage(@RequestParam Long lastArticleId,
            @RequestParam int size, @LoginMember Member loginMember) {
        List<FeedResponse> responses = articleViewService.showPage(lastArticleId, size,
                loginMember);
        return ResponseEntity.ok(responses);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ArticleResponse> show(@PathVariable Long id,
            @LoginMember Member loginMember) {
        ArticleResponse articleResponse = articleViewService.show(id, loginMember);

        return ResponseEntity.ok(articleResponse);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> updateArticle(@PathVariable Long id,
            @RequestBody ArticleRequest request, @LoginMember Member loginMember) {
        articleService.update(id, request, loginMember);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        articleService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping(TRADE_STATE_URI)
    public ResponseEntity<List<SalesHistoryResponse>> showSalesDetailsArticle(
            @RequestParam String tradeState, @LoginMember Member loginMember) {
        List<SalesHistoryResponse> responses = articleViewService.showByTradeState(loginMember,
                tradeState);
        return ResponseEntity.ok(responses);
    }

    @PutMapping("/{id}/" + TRADE_STATE_URI)
    public ResponseEntity<Void> updateTradeState(@PathVariable Long id,
            @RequestBody TradeStateRequest request, @LoginMember Member loginMember) {
        articleService.updateTradeState(id, request, loginMember);
        return ResponseEntity.noContent().build();
    }

    @GetMapping(FAVORITE_URI)
    public ResponseEntity<List<ArticleCardResponse>> showFavorites(
            @LoginMember Member loginMember) {
        List<ArticleCardResponse> responses = articleViewService.showFavorites(loginMember);
        return ResponseEntity.ok(responses);
    }
}
