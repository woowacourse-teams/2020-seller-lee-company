package sellerlee.back.article.presentation;

import static sellerlee.back.article.presentation.ArticleController.*;

import java.net.URI;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import sellerlee.back.article.application.ArticleRequest;
import sellerlee.back.article.application.ArticleResponse;
import sellerlee.back.article.application.ArticleService;
import sellerlee.back.article.application.ArticleViewService;
import sellerlee.back.article.application.FeedResponse;
import sellerlee.back.article.application.SalesHistoryResponse;
import sellerlee.back.article.application.TradeSateUpdateRequest;
import sellerlee.back.member.domain.Member;

@RestController
@RequestMapping(ARTICLE_URI)
public class ArticleController {
    public static final String ARTICLE_URI = "/articles";

    private final ArticleService articleService;
    private final ArticleViewService articleViewService;

    public ArticleController(ArticleService articleService, ArticleViewService articleViewService) {
        this.articleService = articleService;
        this.articleViewService = articleViewService;
    }

    @PostMapping
    public ResponseEntity<Void> create(@RequestBody ArticleRequest request) {
        Long articleId = articleService.create(request);
        return ResponseEntity
                .created(URI.create(ARTICLE_URI + "/" + articleId))
                .build();
    }

    @GetMapping
    public ResponseEntity<List<FeedResponse>> showPage(@RequestParam Long lastArticleId,
            @RequestParam int size) {
        List<FeedResponse> responses = articleViewService.showFeedPage(lastArticleId, size,
                new Member(
                        51L,
                        "turtle@woowabro.com",
                        "1234",
                        "testUri",
                        "testNickname",
                        4.5));

        return ResponseEntity
                .ok(responses);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ArticleResponse> showArticle(@PathVariable Long id) {
        ArticleResponse articleResponse = articleViewService.show(id,
                new Member(
                        51L,
                        "turtle@woowabro.com",
                        "1234",
                        "testNickname",
                        "testUri",
                        4.5));

        return ResponseEntity
                .ok(articleResponse);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        articleService.deleteById(id);

        return ResponseEntity
                .noContent()
                .build();
    }

    @GetMapping("/trade-state")
    public ResponseEntity<List<SalesHistoryResponse>> showSalesDetailsArticle(
            @RequestParam String tradeState) {
        // TODO: 2020/08/12 로그인생기면 없어질 member
        Member member = new Member(
                51L,
                "turtle@woowabro.com",
                "1234",
                "testNickname",
                "testUri",
                4.0);
        List<SalesHistoryResponse> salesHistoryRespons = articleViewService.showSalesDetails(
                member,
                tradeState);

        return ResponseEntity.ok(salesHistoryRespons);
    }

    @PatchMapping("/trade-state")
    public ResponseEntity<SalesHistoryResponse> updateTradeState(
            @RequestBody TradeSateUpdateRequest tradeSateUpdateRequest) {
        // TODO: 2020/08/12 로그인생기면 없어질 member
        Member member = new Member(
                51L,
                "turtle@woowabro.com",
                "1234",
                "testNickname",
                "testUri",
                4.0);

        articleService.updateTradeState(member, tradeSateUpdateRequest);

        return ResponseEntity.ok().build();
    }

    /*
     * MemberResponse.of의 인자로 Favorite도 받도록 변경되어서 일단 주석처리했음
     * 코즈 PR이 머지되면 수정할 예정
     * @GetMapping("/trade-state")
     * public ResponseEntity<List<ArticleResponse>> showByTradeState(@RequestParam String tradeState){
     *     List<ArticleResponse> responses = articleViewService.showByTradeState(tradeState);
     *     return ResponseEntity.ok(responses);
     * }
     */
}
