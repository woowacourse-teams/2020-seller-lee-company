package com.jikgorae.api.articleorganization.application;

import static com.jikgorae.api.fixture.ArticleFixture.*;
import static com.jikgorae.api.fixture.OrganizationFixture.*;
import static org.assertj.core.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.jikgorae.api.articleorganization.domain.ArticleOrganization;
import com.jikgorae.api.articleorganization.domain.ArticleOrganizationRepository;

@ExtendWith(value = MockitoExtension.class)
public class ArticleOrganizationServiceTest {
    @Mock
    private ArticleOrganizationRepository articleOrganizationRepository;
    private ArticleOrganizationService articleOrganizationService;

    @BeforeEach
    void setUp() {
        this.articleOrganizationService = new ArticleOrganizationService(articleOrganizationRepository);
    }

    @DisplayName("ArticleOrganization 생성")
    @Test
    void create() {
        when(articleOrganizationRepository.save(any())).thenReturn(ARTICLE1_SELLERLEE_CO);

        ArticleOrganization actual = articleOrganizationService.create(ARTICLE1, SELLERLEE_CO);

        assertThat(actual.getArticle()).isEqualTo(ARTICLE1_SELLERLEE_CO.getArticle());
        assertThat(actual.getOrganization()).isEqualTo(ARTICLE1_SELLERLEE_CO.getOrganization());
    }
}
