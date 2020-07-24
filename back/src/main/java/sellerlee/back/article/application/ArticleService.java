/**
 * @author jnsorn
 */

package sellerlee.back.article.application;

import org.springframework.stereotype.Service;
import sellerlee.back.article.domain.Article;
import sellerlee.back.article.domain.ArticleRepository;
import sellerlee.back.article.presentation.ArticleResponse;

@Service
public class ArticleService {
    private final ArticleRepository articleRepository;

    public ArticleService(ArticleRepository articleRepository) {
        this.articleRepository = articleRepository;
    }

    public ArticleResponse createArticle(Article article) {
        Article persistArticle = articleRepository.save(article);
        return ArticleResponse.of(persistArticle);
    }
}