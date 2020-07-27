/**
 * @author kouz95
 */

package sellerlee.back.article.application;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import sellerlee.back.article.domain.ArticleRepository;

import java.util.List;

@Service
public class ArticleService {
    private final ArticleRepository articleRepository;

    public ArticleService(ArticleRepository articleRepository) {
        this.articleRepository = articleRepository;
    }

    @Transactional(readOnly = true)
    public List<ArticleResponse> showAll() {
        return ArticleResponse.listOf(articleRepository.findAll());
    }
}
