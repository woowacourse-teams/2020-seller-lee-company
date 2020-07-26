/**
 * @author jnsorn
 */

package sellerlee.back.article.presentation;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import sellerlee.back.article.application.ArticleCreateRequest;
import sellerlee.back.article.application.ArticleService;

import java.net.URI;

@RequestMapping(ArticleController.ARTICLE_URI)
@RestController
public class ArticleController {
    public static final String ARTICLE_URI = "/articles";

    private final ArticleService articleService;

    public ArticleController(ArticleService articleService) {
        this.articleService = articleService;
    }

    @PostMapping
    public ResponseEntity<Void> createArticle(@RequestBody ArticleCreateRequest request) {
        Long articleId = articleService.createArticle(request);
        return ResponseEntity.created(URI.create(ARTICLE_URI + "/" + articleId)).build();
    }
}