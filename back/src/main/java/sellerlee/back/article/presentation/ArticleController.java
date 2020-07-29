/**
 * @author begaonnuri
 */

package sellerlee.back.article.presentation;

import static sellerlee.back.article.presentation.ArticleController.*;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import sellerlee.back.article.application.ArticleResponse;
import sellerlee.back.article.application.ArticleService;

@RestController
@RequestMapping(ARTICLE_URI)
public class ArticleController {
    public static final String ARTICLE_URI = "/articles";

    private final ArticleService articleService;

    public ArticleController(ArticleService articleService) {
        this.articleService = articleService;
    }

    @GetMapping
    public ResponseEntity<List<ArticleResponse>> showArticlePage(@RequestParam Long lastArticleId,
            @RequestParam int size) {
        List<ArticleResponse> responses = articleService.showArticlePage(lastArticleId, size);
        return ResponseEntity.ok(responses);
    }
}
