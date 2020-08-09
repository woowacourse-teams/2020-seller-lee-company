package sellerlee.back.article.domain;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ArticleRepository extends JpaRepository<Article, Long> {
    Page<Article> findByIdLessThanOrderByIdDesc(Long lastArticleId, Pageable pageRequest);

    List<Article> findByTradeState(TradeState tradeState);
}
