package sellerlee.back.article.application;

import java.util.NoSuchElementException;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import sellerlee.back.article.domain.Article;
import sellerlee.back.article.domain.ArticleRepository;

@Service
public class ArticleService {
    private final ArticleRepository articleRepository;

    public ArticleService(ArticleRepository articleRepository) {
        this.articleRepository = articleRepository;
    }

    public Long post(ArticleRequest request) {
        Article article = articleRepository.save(request.toArticle());
        return article.getId();
    }

    @Transactional
    public void update(Long id, ArticleRequest request) {
        Article article = articleRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("수정할 게시글이 존재하지 않습니다."));

        article.update(request.toArticle());
    }

    public void deleteById(Long id) {
        articleRepository.deleteById(id);
    }
}
