package sellerlee.back.article.application;

import java.util.NoSuchElementException;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import sellerlee.back.article.domain.Article;
import sellerlee.back.article.domain.ArticleRepository;
import sellerlee.back.article.domain.TradeState;
import sellerlee.back.member.domain.Member;

@Service
public class ArticleService {
    private final ArticleRepository articleRepository;

    public ArticleService(ArticleRepository articleRepository) {
        this.articleRepository = articleRepository;
    }

    public Long create(ArticleRequest request) {
        Article article = articleRepository.save(request.toArticle());
        return article.getId();
    }

    @Transactional
    public void update(Long id, ArticleRequest request) {
        Article article = articleRepository.findById(id)
                .orElseThrow(NoSuchElementException::new);

        article.update(request.toArticle());
    }

    public void deleteById(Long id) {
        articleRepository.deleteById(id);
    }

    @Transactional
    public void updateTradeState(Member member,
            TradeSateUpdateRequest tradeSateUpdateRequest) {
        Article article = getArticleByAuthorAndTradeState(member, tradeSateUpdateRequest);
        article.updateState(TradeState.fromString(tradeSateUpdateRequest.getTradeState()));
    }

    private Article getArticleByAuthorAndTradeState(Member member,
            TradeSateUpdateRequest tradeSateUpdateRequest) {
        return articleRepository.findByAuthorAndId(member,
                tradeSateUpdateRequest.getId())
                .orElseThrow(() -> new IllegalArgumentException("article 존재하지 않습니다."));
    }
}
