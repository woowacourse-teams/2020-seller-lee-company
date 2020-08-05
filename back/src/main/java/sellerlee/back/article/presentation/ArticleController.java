/**
 * @author begaonnuri
 */

package sellerlee.back.article.presentation;

import static sellerlee.back.article.presentation.ArticleController.*;

import java.net.URI;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import sellerlee.back.article.application.ArticleCreateRequest;
import sellerlee.back.article.application.ArticleResponse;
import sellerlee.back.article.application.ArticleService;
import sellerlee.back.article.application.ArticleViewService;
import sellerlee.back.article.application.FeedResponse;
import sellerlee.back.member.domain.Member;

@RestController
@RequestMapping(ARTICLE_URI)
public class ArticleController {
    public static final String ARTICLE_URI = "/articles";

    private final ArticleService articleService;
    private final ArticleViewService articleViewService;

    public ArticleController(ArticleService articleService,
            ArticleViewService articleViewService) {
        this.articleService = articleService;
        this.articleViewService = articleViewService;
    }

    @PostMapping
    public ResponseEntity<Void> post(@RequestBody ArticleCreateRequest request) {
        Long articleId = articleService.post(request);
        return ResponseEntity
                .created(URI.create(ARTICLE_URI + "/" + articleId))
                .build();
    }

    @GetMapping
    public ResponseEntity<List<FeedResponse>> showArticlePage(
            @RequestParam Long lastArticleId,
            @RequestParam int size) {
        List<FeedResponse> responses = articleService.showArticlePage(lastArticleId, size);
        return ResponseEntity.ok(responses);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ArticleResponse> showArticle(@PathVariable Long id) {
        Member member = new Member(
                51L,
                "turtle@woowabro.com",
                "1234",
                "testNickname",
                "testUri",
                4.5);
        ArticleResponse articleResponse = articleViewService.showArticle(id, member);

        return ResponseEntity.ok(articleResponse);
    }
}
