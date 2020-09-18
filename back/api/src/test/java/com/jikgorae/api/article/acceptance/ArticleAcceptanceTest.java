package com.jikgorae.api.article.acceptance;

import static com.jikgorae.api.fixture.ArticleFixture.*;
import static com.jikgorae.api.fixture.MemberFixture.*;
import static com.jikgorae.api.fixture.OrganizationFixture.*;
import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.DynamicTest.*;
import static org.springframework.http.HttpHeaders.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.List;
import java.util.stream.Stream;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.DynamicTest;
import org.junit.jupiter.api.TestFactory;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import com.jikgorae.api.AcceptanceTest;
import com.jikgorae.api.article.application.ArticleCardResponse;
import com.jikgorae.api.article.application.ArticleResponse;
import com.jikgorae.api.article.application.FeedResponse;
import com.jikgorae.api.article.application.TradeStateRequest;
import com.jikgorae.api.article.presentation.ArticleController;
import com.jikgorae.api.member.application.AuthTokenResponse;
import com.jikgorae.api.organization.application.OrganizationResponse;
import com.jikgorae.api.security.web.AuthorizationType;

public class ArticleAcceptanceTest extends AcceptanceTest {
    public static final Long LAST_ARTICLE_ID = 4L;
    public static final int ARTICLE_SIZE = 2;

    private AuthTokenResponse token;

    /**
     * Feature: 게시글 관리
     *
     * Scenario: 게시글을 관리한다.
     *
     * Given 그룹이 추가되어 있다.
     *
     * When 게시글을 등록한다.
     * Then 게시글이 추가되었다.
     *
     * When 전체 게시글을 조회한다.
     * Then 게시글이 조회된다.
     *
     * When 예약중|판매중 상태 게시글을 조회한다.
     * then 게시글이 조회된다.
     *
     * when 예약중으로 상태를 변경한다.
     * then 상태가 변경된다.
     *
     * When 게시글을 클릭한다.
     * Then 게시글 정보와 좋아요를 응답받는다.
     *
     * When 게시글을 삭제한다.
     * Then 게시글이 삭제된다.
     */
    @DisplayName("게시글 관리")
    @TestFactory
    @WithMockUser
    Stream<DynamicTest> manageArticle() throws Exception {
        token = joinAndLogin(MEMBER1);

        OrganizationResponse 직고래 = createOrganization(token, 우아한테크코스_REQUEST);
        // 게시글을 등록한다.
        Long articleId = extractId(createArticle(token));
        Long articleId2 = extractId(createArticle(token));
        Long articleId3 = extractId(createArticle(token));
        Long articleId4 = extractId(createArticle(token));

        return Stream.of(
                dynamicTest("게시글 페이지 조회", () -> {
                    List<FeedResponse> feedArticleResponses = showPage(articleId4);
                    assertThat(feedArticleResponses.size()).isEqualTo(ARTICLE_SIZE);
                }),
                dynamicTest("카테고리 별 게시글 페이지 조회", () -> {
                    List<ArticleCardResponse> feedArticleResponses = showPageByCategory(articleId4);
                    assertThat(feedArticleResponses.size()).isEqualTo(ARTICLE_SIZE);
                }),
                dynamicTest("게시글 상세 조회", () -> {
                    ArticleResponse articleResponse = showArticle(articleId);
                    assertThat(articleResponse.getId()).isEqualTo(articleId);
                    assertThat(articleResponse.getFavoriteState()).isFalse();
                }),
                dynamicTest("판매중인 게시글 조회", () -> {
                    List<ArticleCardResponse> responses = showSalesHistory();
                    assertThat(responses).hasSize(4);
                }),
                dynamicTest("예약중으로 tradeState 변경후 조회", () -> {
                    updateTradeState(articleId);
                    ArticleResponse articleResponse = showArticle(articleId);

                    assertThat(articleResponse.getTradeState()).isEqualTo("예약중");
                }),
                dynamicTest("게시글 삭제", () -> deleteArticle(articleId))
        );
    }

    private List<FeedResponse> showPage(Long articleId) throws Exception {

        MvcResult mvcResult = mockMvc.perform(
                MockMvcRequestBuilders.get(ArticleController.ARTICLE_API_URI)
                        .header(AUTHORIZATION, String.format("%s %s", AuthorizationType.BEARER,
                                token.getAccessToken()))
                        .param("lastArticleId", String.valueOf(articleId))
                        .param("size", String.valueOf(ARTICLE_SIZE)))
                .andReturn();

        String json = mvcResult.getResponse().getContentAsString();

        return objectMapper.readValue(json, objectMapper.getTypeFactory()
                .constructCollectionType(List.class, FeedResponse.class));
    }

    private List<ArticleCardResponse> showPageByCategory(Long articleId) throws
            Exception {

        MvcResult mvcResult = mockMvc.perform(
                MockMvcRequestBuilders.get(ArticleController.ARTICLE_API_URI)
                        .header(AUTHORIZATION, String.format("%s %s", AuthorizationType.BEARER,
                                token.getAccessToken()))
                        .param("lastArticleId", String.valueOf(articleId))
                        .param("size", String.valueOf(ARTICLE_SIZE))
                        .param("category", ARTICLE_REQUEST.getCategory()))
                .andReturn();

        String json = mvcResult.getResponse().getContentAsString();

        return objectMapper.readValue(json, objectMapper.getTypeFactory()
                .constructCollectionType(List.class, ArticleResponse.class));
    }

    private ArticleResponse showArticle(Long articleId) throws Exception {

        MvcResult mvcResult = mockMvc.perform(
                get(ArticleController.ARTICLE_API_URI + "/" + articleId)
                        .header(AUTHORIZATION, String.format("%s %s", AuthorizationType.BEARER,
                                token.getAccessToken())))
                .andExpect(status().isOk())
                .andReturn();

        String json = mvcResult.getResponse().getContentAsString();

        return objectMapper.readValue(json, ArticleResponse.class);
    }

    private void deleteArticle(Long articleId) throws Exception {

        mockMvc.perform(
                delete(ArticleController.ARTICLE_API_URI + "/" + articleId)
                        .header(AUTHORIZATION, String.format("%s %s", AuthorizationType.BEARER,
                                token.getAccessToken())))
                .andExpect(status().isNoContent());
    }

    private List<ArticleCardResponse> showSalesHistory() throws Exception {
        String tradeState = "ON_SALE";

        MvcResult mvcResult = mockMvc.perform(
                MockMvcRequestBuilders.get(ArticleController.ARTICLE_API_URI)
                        .header(AUTHORIZATION, String.format("%s %s", AuthorizationType.BEARER,
                                token.getAccessToken()))
                        .param("tradeState", tradeState))
                .andReturn();

        String json = mvcResult.getResponse().getContentAsString();

        return objectMapper.readValue(json, objectMapper.getTypeFactory()
                .constructCollectionType(List.class, ArticleCardResponse.class));
    }

    private void updateTradeState(Long articleId) throws Exception {
        String tradeState = "RESERVED";

        TradeStateRequest tradeStateRequest = new TradeStateRequest(tradeState);

        mockMvc.perform(
                put(ArticleController.ARTICLE_API_URI + "/" + articleId
                        + ArticleController.TRADE_STATE_URI)
                        .header(AUTHORIZATION, String.format("%s %s", AuthorizationType.BEARER,
                                token.getAccessToken()))
                        .accept(MediaType.APPLICATION_JSON_VALUE)
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .content(objectMapper.writeValueAsString(tradeStateRequest)))
                .andExpect(status().isNoContent());
    }
}
