package com.jikgorae.api.article.acceptance;

import static com.jikgorae.api.article.presentation.ArticleController.*;
import static com.jikgorae.api.fixture.ArticleFixture.*;
import static com.jikgorae.api.fixture.MemberFixture.*;
import static com.jikgorae.api.fixture.OrganizationFixture.*;
import static com.jikgorae.api.fixture.TagFixture.*;
import static com.jikgorae.api.security.oauth2.authentication.AuthorizationExtractor.*;
import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.DynamicTest.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.Arrays;
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
import com.jikgorae.api.article.application.ArticleRequest;
import com.jikgorae.api.article.application.ArticleResponse;
import com.jikgorae.api.article.application.FeedResponse;
import com.jikgorae.api.article.application.TradeStateRequest;
import com.jikgorae.api.article.presentation.ArticleController;
import com.jikgorae.api.member.application.AuthTokenResponse;
import com.jikgorae.api.organization.application.OrganizationResponse;
import com.jikgorae.api.organization.domain.Organization;
import com.jikgorae.api.security.web.AuthorizationType;

public class ArticleAcceptanceTest extends AcceptanceTest {
    public static final Long LAST_ARTICLE_ID = 8L;
    public static final int ARTICLE_SIZE = 8;

    private AuthTokenResponse token;

    /**
     * Feature: 게시글 관리
     *
     * Scenario: 게시글을 관리한다.
     *
     * Given 회원에게 조직이 등록되어 있다.
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
        //Given 조직이 등록되어 있다.
        OrganizationResponse 우아한테크코스 = createOrganization(token, 우아한테크코스_요청);
        OrganizationResponse 한성대학교 = createOrganization(token, 한성대학교_요청);
        OrganizationResponse 직고래 = createOrganization(token, 직고래_요청);

        // Given 회원에게 조직이 등록되어 있다.
        createMemberOrganization(우아한테크코스, token);
        createMemberOrganization(한성대학교, token);

        // 조직을 추가한 게시글을 등록한다.
        Long 우아한테크코스_게시물 = extractId(createArticleToOrganization(token, 우아한테크코스));
        Long 우아한테크코스_게시물2 = extractId(createArticleToOrganization(token, 우아한테크코스));
        Long 한성대학교_게시물 = extractId(createArticleToOrganization(token, 한성대학교));
        Long 한성대학교_게시물2 = extractId(createArticleToOrganization(token, 한성대학교));
        Long 한성대학교_게시물3 = extractId(createArticleToOrganization(token, 한성대학교));
        Long 한성대학교_게시물4 = extractId(createArticleToOrganization(token, 한성대학교));
        Long 직고래_게시글 = extractId(createArticleToOrganization(token, 직고래));
        Long 직고래_게시글2 = extractId(createArticleToOrganization(token, 직고래));

        return Stream.of(
                dynamicTest("전체 게시글 페이지 조회", () -> {
                    List<FeedResponse> feedArticleResponses = showPage(LAST_ARTICLE_ID);
                    assertThat(feedArticleResponses.size()).isEqualTo(6);
                }),
                dynamicTest("조직별 게시글 페이지 조회", () -> {
                    List<FeedResponse> feedArticleResponses = showPageByOrganization(
                            LAST_ARTICLE_ID, 한성대학교.getId());
                    assertThat(feedArticleResponses.size()).isEqualTo(4);
                }),
                dynamicTest("카테고리 별 게시글 페이지 조회", () -> {
                    List<ArticleCardResponse> feedArticleResponses = showPageByCategory(
                            LAST_ARTICLE_ID);
                    assertThat(feedArticleResponses.size()).isEqualTo(ARTICLE_SIZE - 1);
                }),
                dynamicTest("게시글 상세 조회", () -> {
                    ArticleResponse articleResponse = showArticle(우아한테크코스_게시물);
                    assertThat(articleResponse.getId()).isEqualTo(우아한테크코스_게시물);
                    assertThat(articleResponse.getFavoriteState()).isFalse();
                }),
                dynamicTest("판매중인 게시글 조회", () -> {
                    List<ArticleCardResponse> responses = showSalesHistory();
                    assertThat(responses).hasSize(ARTICLE_SIZE);
                }),
                dynamicTest("예약중으로 tradeState 변경후 조회", () -> {
                    updateTradeState(우아한테크코스_게시물);
                    ArticleResponse articleResponse = showArticle(우아한테크코스_게시물);

                    assertThat(articleResponse.getTradeState()).isEqualTo("예약중");
                }),
                dynamicTest("게시글 삭제", () -> deleteArticle(우아한테크코스_게시물))
        );
    }

    private List<FeedResponse> showPage(Long articleId) throws Exception {

        MvcResult mvcResult = mockMvc.perform(
                MockMvcRequestBuilders.get(ArticleController.ARTICLE_API_URI + ORGANIZATION_URI)
                        .header(AUTHORIZATION, String.format("%s %s", AuthorizationType.BEARER,
                                token.getAccessToken()))
                        .param("lastArticleId", String.valueOf(articleId))
                        .param("size", String.valueOf(ARTICLE_SIZE)))
                .andReturn();
        String json = mvcResult.getResponse().getContentAsString();

        return objectMapper.readValue(json, objectMapper.getTypeFactory()
                .constructCollectionType(List.class, FeedResponse.class));
    }

    private List<FeedResponse> showPageByOrganization(Long articleId,
            Long organizationId) throws Exception {

        MvcResult mvcResult = mockMvc.perform(
                MockMvcRequestBuilders.get(
                        ArticleController.ARTICLE_API_URI + ORGANIZATION_URI + "/" + organizationId)
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
                        .param("category", 직고래_게시물_요청.getCategory()))
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
