/**
 * @author kouz95
 */

package sellerlee.back.article.presentation;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import sellerlee.back.article.application.ArticleResponse;
import sellerlee.back.article.application.ArticleService;

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

    @GetMapping
    public ResponseEntity<List<ArticleResponse>> showAll() {
        List<ArticleResponse> responses = articleService.showAll();
        return ResponseEntity.ok(responses);
    }
}
