/**
 * @author begaonnuri
 */

package sellerlee.back.article.domain;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ArticleRepository extends JpaRepository<Article, Long> {
    Page<Article> findByIdLessThanOrderByIdDesc(Long lastArticleId, Pageable pageRequest);
}
