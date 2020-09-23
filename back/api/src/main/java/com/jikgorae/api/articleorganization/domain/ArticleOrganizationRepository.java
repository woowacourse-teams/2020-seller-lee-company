package com.jikgorae.api.articleorganization.domain;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ArticleOrganizationRepository extends JpaRepository<ArticleOrganization, Long> {
    List<ArticleOrganization> findAllByArticleId(Long articleId);

    void deleteAllByArticleId(Long articleId);
}
