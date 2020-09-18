package com.jikgorae.api.articleorganization.application;

import static com.jikgorae.api.fixture.ArticleFixture.*;
import static com.jikgorae.api.fixture.ArticleOrganizationFixture.*;
import static com.jikgorae.api.fixture.OrganizationFixture.*;
import static org.assertj.core.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

import java.util.Arrays;
import java.util.List;

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
        this.articleOrganizationService = new ArticleOrganizationService(
                articleOrganizationRepository);
    }

    @DisplayName("ArticleOrganization 생성")
    @Test
    void create() {
        articleOrganizationService.create(ARTICLE1, Arrays.asList(직고래));

        verify(articleOrganizationRepository).saveAll(any());
    }

    @DisplayName("ArticleOrganization 생성")
    @Test
    void showByArticleId() {
        when(articleOrganizationRepository.findAllByArticleId(any())).thenReturn(
                Arrays.asList(ARTICLE1_직고래));
        List<ArticleOrganization> actual = articleOrganizationService.showByArticleId(
                ARTICLE1.getId());
        assertThat(actual).containsExactly(ARTICLE1_직고래);
    }

    @DisplayName("ArticleOrganization 생성")
    @Test
    void deleteByArticleId() {
        articleOrganizationService.deleteByArticleId(ARTICLE1.getId());
        verify(articleOrganizationRepository).deleteByArticleId(ARTICLE1.getId());
    }
}
