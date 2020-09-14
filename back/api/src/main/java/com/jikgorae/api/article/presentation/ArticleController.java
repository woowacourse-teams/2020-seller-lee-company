package com.jikgorae.api.article.presentation;

import static com.jikgorae.api.article.presentation.ArticleController.*;

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

import com.jikgorae.api.article.application.ArticleCardResponse;
import com.jikgorae.api.article.application.ArticleRequest;
import com.jikgorae.api.article.application.ArticleResponse;
import com.jikgorae.api.article.application.ArticleService;
import com.jikgorae.api.article.application.ArticleViewService;
import com.jikgorae.api.article.application.FeedResponse;
import com.jikgorae.api.article.application.TradeStateRequest;
import com.jikgorae.api.article.query.ArticleDao;
import com.jikgorae.api.member.domain.Member;
import com.jikgorae.api.security.core.LoginMember;

@RestController
@RequestMapping(ARTICLE_API_URI)
public class ArticleController {
    public static final String ARTICLE_API_URI = "/api/articles";
    public static final String TRADE_STATE_URI = "/trade-state";

    private final ArticleService articleService;
    private final ArticleViewService articleViewService;
    private final ArticleDao articleDao;

    public ArticleController(ArticleService articleService, ArticleViewService articleViewService,
            ArticleDao articleDao) {
        this.articleService = articleService;
        this.articleViewService = articleViewService;
        this.articleDao = articleDao;
    }

    @PostMapping
    public ResponseEntity<Void> create(@RequestBody ArticleRequest request,
            @LoginMember Member loginMember) {
        Long articleId = articleService.create(request, loginMember);
        return ResponseEntity
                .created(URI.create(ARTICLE_API_URI + "/" + articleId))
                .build();
    }

    @GetMapping(params = {"lastArticleId", "size"})
    public ResponseEntity<List<FeedResponse>> showPage(@RequestParam Long lastArticleId,
            @RequestParam int size, @LoginMember Member loginMember) {
        List<FeedResponse> responses = articleDao.showPage(lastArticleId, size, loginMember);
        return ResponseEntity.ok(responses);
    }

    @GetMapping(params = {"lastArticleId", "size", "category"})
    public ResponseEntity<List<ArticleCardResponse>> showPageByCategory(
            @RequestParam Long lastArticleId,
            @RequestParam int size, @RequestParam String category,
            @LoginMember Member loginMember) {
        List<ArticleCardResponse> responses = articleViewService.showPageByCategory(
                lastArticleId, size, category, loginMember);
        return ResponseEntity.ok(responses);
    }

    @GetMapping(params = "tradeState")
    public ResponseEntity<List<ArticleCardResponse>> showByTradeState(
            @RequestParam String tradeState, @LoginMember Member loginMember) {
        List<ArticleCardResponse> responses = articleViewService.showByTradeState(loginMember,
                tradeState);
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
    public ResponseEntity<Void> delete(@PathVariable Long id, @LoginMember Member loginMember) {
        articleService.deleteById(id, loginMember);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}/" + TRADE_STATE_URI)
    public ResponseEntity<Void> updateTradeState(@PathVariable Long id,
            @RequestBody TradeStateRequest request, @LoginMember Member loginMember) {
        articleService.updateTradeState(id, request, loginMember);
        return ResponseEntity.noContent().build();
    }
}
