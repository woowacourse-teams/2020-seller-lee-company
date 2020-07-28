/**
 * @author jnsorn
 */

package sellerlee.back.article.presentation;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sellerlee.back.article.application.ArticleCreateRequest;
import sellerlee.back.article.application.ArticleResponse;
import sellerlee.back.article.application.ArticleService;

import java.net.URI;
import java.util.List;

import static sellerlee.back.article.presentation.ArticleController.ARTICLE_URI;

@RestController
@RequestMapping(ARTICLE_URI)
public class ArticleController {
    public static final String ARTICLE_URI = "/articles";

    private final ArticleService articleService;

    public ArticleController(ArticleService articleService) {
        this.articleService = articleService;
    }

    @PostMapping
    public ResponseEntity<Void> post(@RequestBody ArticleCreateRequest request) {
        Long articleId = articleService.post(request);
        return ResponseEntity
                .created(URI.create(ARTICLE_URI + "/" + articleId))
                .build();
    }

    @GetMapping
    public ResponseEntity<List<ArticleResponse>> showAll() {
        List<ArticleResponse> responses = articleService.showAll();
        return ResponseEntity.ok(responses);
    }
}
