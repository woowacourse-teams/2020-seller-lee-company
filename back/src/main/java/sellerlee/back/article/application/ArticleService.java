/**
 * @author kouz95
 */

package sellerlee.back.article.application;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import sellerlee.back.article.domain.Article;
import sellerlee.back.article.domain.ArticleRepository;

import java.util.List;

@Service
public class ArticleService {
    private final ArticleRepository articleRepository;

    public ArticleService(ArticleRepository articleRepository) {
        this.articleRepository = articleRepository;
    }

    public Long createArticle(Long id) {
        return null;
    }

    @Transactional(readOnly = true)
    public List<Article> showAll() {
        return articleRepository.findAll();
    }
}
