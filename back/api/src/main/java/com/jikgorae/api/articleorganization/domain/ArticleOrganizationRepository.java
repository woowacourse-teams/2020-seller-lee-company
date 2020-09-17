package com.jikgorae.api.articleorganization.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ArticleOrganizationRepository extends JpaRepository<ArticleOrganization, Long> {
}
