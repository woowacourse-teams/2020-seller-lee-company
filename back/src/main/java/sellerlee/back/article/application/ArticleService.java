/**
 * @author kouz95
 */

package sellerlee.back.article.application;

import org.springframework.stereotype.Service;

import sellerlee.back.article.domain.Article;
import sellerlee.back.article.domain.ArticleRepository;

@Service
public class ArticleService {
    private final ArticleRepository articleRepository;

    public ArticleService(ArticleRepository articleRepository) {
        this.articleRepository = articleRepository;
    }

    public Long post(ArticleCreateRequest request) {
        Article article = articleRepository.save(request.toArticle());
        return article.getId();
    }
}
