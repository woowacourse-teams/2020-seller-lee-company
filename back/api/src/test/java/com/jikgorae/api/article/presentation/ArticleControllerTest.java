package com.jikgorae.api.article.presentation;

import static com.jikgorae.api.article.acceptance.ArticleAcceptanceTest.*;
import static com.jikgorae.api.article.presentation.ArticleController.*;
import static com.jikgorae.api.fixture.ArticleFixture.*;
import static com.jikgorae.api.fixture.MemberFixture.*;
import static com.jikgorae.api.fixture.OrganizationFixture.*;
import static com.jikgorae.api.security.oauth2.authentication.AuthorizationExtractor.*;
import static java.util.Collections.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;
import static org.springframework.restdocs.headers.HeaderDocumentation.*;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.*;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.*;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.restdocs.request.RequestDocumentation.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.Arrays;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.restdocs.payload.JsonFieldType;

import com.jikgorae.api.ControllerTest;
import com.jikgorae.api.article.application.ArticleCardResponse;
import com.jikgorae.api.article.application.ArticleResponse;
import com.jikgorae.api.article.application.ArticleService;
import com.jikgorae.api.article.application.ArticleViewService;
import com.jikgorae.api.article.application.FeedResponse;
import com.jikgorae.api.article.application.TradeStateRequest;
import com.jikgorae.api.article.domain.Category;
import com.jikgorae.api.article.query.ArticleDao;

@WebMvcTest(controllers = ArticleController.class)
class ArticleControllerTest extends ControllerTest {
    @MockBean
    private ArticleService articleService;

    @MockBean
    private ArticleViewService articleViewService;

    @MockBean
    private ArticleDao articleDao;

    @DisplayName("게시글 생성 시 HTTP status는 Created다.")
    @Test
    void createArticle() throws Exception {
        String request = objectMapper.writeValueAsString(직고래_게시물_요청);

        when(articleService.create(any(), any())).thenReturn(1L);

        // @formatter:off
        mockMvc
                .perform(
                        post(ARTICLE_API_URI)
                                .header(AUTHORIZATION, TEST_AUTHORIZATION_HEADER)
                                .accept(MediaType.APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(request))
                .andExpect(status().isCreated())
                .andDo(
                        document("articles/post",
                                preprocessRequest(prettyPrint()),
                                requestHeaders(
                                        headerWithName("Authorization").description("회원의 토큰")
                                ),
                                requestFields(
                                        fieldWithPath("title").type(JsonFieldType.STRING).description("게시글의 제목"),
                                        fieldWithPath("organizations.[].id").type(JsonFieldType.NUMBER).description("게시글이 속한 조직의 아이디"),
                                        fieldWithPath("organizations.[].name").type(JsonFieldType.STRING).description("게시글이 속한 조직의 이름"),
                                        fieldWithPath("organizations.[].code").type(JsonFieldType.STRING).description("게시글이 속한 조직의 입장번호"),
                                        fieldWithPath("category").type(JsonFieldType.STRING).description("게시글의 카테고리"),
                                        fieldWithPath("contents").type(JsonFieldType.STRING).description("게시글의 내용"),
                                        fieldWithPath("price").type(JsonFieldType.NUMBER).description("게시글의 가격"),
                                        // fieldWithPath("tradeState").type(JsonFieldType.STRING).description("게시글의 판매 상태"),
                                        fieldWithPath("tags").type(JsonFieldType.ARRAY).description("태그의 리스트"),
                                        fieldWithPath("photos").type(JsonFieldType.ARRAY).description("사진의 리스트")
                                ),
                                responseHeaders(
                                        headerWithName("Location").description("생성된 게시글의 ID가 담긴 URI")
                                )));
        // @formatter:on
    }

    @DisplayName("전체 조직의 게시글 페이지 조회 시 HTTP STATUS OK와 조직의 페이지 별 게시글 반환")
    @Test
    void showPage() throws Exception {
        when(articleDao.showPage(LAST_ARTICLE_ID, ARTICLE_SIZE, MEMBER1, ALL_ORGANIZATION))
                .thenReturn(FeedResponse.listOf(Arrays.asList(ARTICLE1, ARTICLE2),
                        Arrays.asList(1L, 2L), Arrays.asList(true, false)));

        // @formatter:off
        mockMvc
                .perform(
                        get(ARTICLE_API_URI+ORGANIZATION_URI)
                                .header(AUTHORIZATION, TEST_AUTHORIZATION_HEADER)
                                .param("lastArticleId", String.valueOf(LAST_ARTICLE_ID))
                                .param("size", String.valueOf(ARTICLE_SIZE)))
                .andExpect(status().isOk())
                .andDo(
                        document("articles/getPage",
                                preprocessRequest(prettyPrint()),
                                preprocessResponse(prettyPrint()),
                                requestHeaders(
                                        headerWithName("Authorization").description("회원의 토큰")
                                ),
                                requestParameters(
                                        parameterWithName("lastArticleId").description("마지막 게시글의 ID"),
                                        parameterWithName("size").description("가져올 페이지의 크기(게시물 수)")
                                ),
                                responseFields(
                                        fieldWithPath("[].id").type(JsonFieldType.NUMBER).description("게시글의 ID"),
                                        fieldWithPath("[].price").type(JsonFieldType.NUMBER).description("게시글의 가격"),
                                        fieldWithPath("[].favoriteState").type(JsonFieldType.BOOLEAN).description("게시글의 찜 여부"),
                                        fieldWithPath("[].favoriteCount").type(JsonFieldType.NUMBER).description("게시글의 찜 개수"),
                                        fieldWithPath("[].tags").type(JsonFieldType.ARRAY).description("태그의 리스트"),
                                        fieldWithPath("[].photos").type(JsonFieldType.ARRAY).description("사진의 리스트")
                                )));
        // @formatter:on
    }

    @DisplayName("조직별 게시글 페이지 조회 시 HTTP STATUS OK와 페이지 별 게시글 반환")
    @Test
    void showPageByOrganization() throws Exception {
        when(articleDao.showPage(LAST_ARTICLE_ID, ARTICLE_SIZE, MEMBER1, 직고래.getId()))
                .thenReturn(FeedResponse.listOf(Arrays.asList(ARTICLE2, ARTICLE1),
                        Arrays.asList(1L, 2L), Arrays.asList(true, false)));

        // @formatter:off
        mockMvc
                .perform(
                        get(ARTICLE_API_URI + ORGANIZATION_URI + "/" + 직고래.getId())
                                .header(AUTHORIZATION, TEST_AUTHORIZATION_HEADER)
                                .param("lastArticleId", String.valueOf(LAST_ARTICLE_ID))
                                .param("size", String.valueOf(ARTICLE_SIZE)))
                .andExpect(status().isOk())
                .andDo(
                        document("articles/getPage",
                                preprocessRequest(prettyPrint()),
                                preprocessResponse(prettyPrint()),
                                requestHeaders(
                                        headerWithName("Authorization").description("회원의 토큰")
                                ),
                                requestParameters(
                                        parameterWithName("lastArticleId").description("마지막 게시글의 ID"),
                                        parameterWithName("size").description("가져올 페이지의 크기(게시물 수)")
                                ),
                                responseFields(
                                        fieldWithPath("[].id").type(JsonFieldType.NUMBER).description("게시글의 ID"),
                                        fieldWithPath("[].price").type(JsonFieldType.NUMBER).description("게시글의 가격"),
                                        fieldWithPath("[].favoriteState").type(JsonFieldType.BOOLEAN).description("게시글의 찜 여부"),
                                        fieldWithPath("[].favoriteCount").type(JsonFieldType.NUMBER).description("게시글의 찜 개수"),
                                        fieldWithPath("[].tags").type(JsonFieldType.ARRAY).description("태그의 리스트"),
                                        fieldWithPath("[].photos").type(JsonFieldType.ARRAY).description("사진의 리스트")
                                )));
        // @formatter:on
    }

    @DisplayName("카테고리별 게시글 페이지 조회 시 HTTP STATUS OK와 페이지 별 게시글 반환")
    @Test
    void showPageByCategory() throws Exception {
        when(articleDao.showPageByCategory(LAST_ARTICLE_ID, ARTICLE_SIZE,
                Category.ETC.getCategoryName(), MEMBER1, ALL_ORGANIZATION))
                .thenReturn(ArticleCardResponse.listOf(Arrays.asList(ARTICLE2, ARTICLE1),
                        Arrays.asList(1L, 2L), Arrays.asList(true, false)));

        // @formatter:off
        mockMvc
                .perform(
                        get(ARTICLE_API_URI + ORGANIZATION_URI)
                                .header(AUTHORIZATION, TEST_AUTHORIZATION_HEADER)
                                .param("lastArticleId", String.valueOf(LAST_ARTICLE_ID))
                                .param("size", String.valueOf(ARTICLE_SIZE))
                                .param("category", Category.ETC.getCategoryName()))
                .andExpect(status().isOk())
                .andDo(
                        document("articles/getPageByCategory",
                                preprocessRequest(prettyPrint()),
                                preprocessResponse(prettyPrint()),
                                requestHeaders(
                                        headerWithName("Authorization").description("회원의 토큰")
                                ),
                                requestParameters(
                                        parameterWithName("lastArticleId").description("마지막 게시글의 ID"),
                                        parameterWithName("size").description("가져올 페이지의 크기(게시물 수)"),
                                        parameterWithName("category").description("가져올 페이지의 카테고리")
                                ),
                                responseFields(
                                        fieldWithPath("[].id").type(JsonFieldType.NUMBER).description("게시글의 ID"),
                                        fieldWithPath("[].title").type(JsonFieldType.STRING).description("게시글의 제목"),
                                        fieldWithPath("[].price").type(JsonFieldType.NUMBER).description("게시글의 가격"),
                                        fieldWithPath("[].thumbnail").type(JsonFieldType.STRING).description("게시글의 대표 사진"),
                                        fieldWithPath("[].tradeState").type(JsonFieldType.STRING).description("게시글의 거래 상태"),
                                        fieldWithPath("[].favoriteCount").type(JsonFieldType.NUMBER).description("게시글의 찜 개수"),
                                        fieldWithPath("[].favoriteState").type(JsonFieldType.BOOLEAN).description("게시글의 찜 여부"),
                                        fieldWithPath("[].createdTime").type(JsonFieldType.STRING).description("게시글의 생성 시간")
                                )));
        // @formatter:on
    }

    @DisplayName("카테고리와 조직별 게시글 페이지 조회 시 HTTP STATUS OK와 페이지 별 게시글 반환")
    @Test
    void showPageByCategoryAndOrganization() throws Exception {
        when(articleDao.showPageByCategory(LAST_ARTICLE_ID, ARTICLE_SIZE,
                Category.ETC.getCategoryName(), MEMBER1, 직고래.getId()))
                .thenReturn(ArticleCardResponse.listOf(Arrays.asList(ARTICLE2, ARTICLE1),
                        Arrays.asList(1L, 2L), Arrays.asList(true, false)));
        // @formatter:off
        mockMvc
                .perform(
                        get(ARTICLE_API_URI+ORGANIZATION_URI+"/"+직고래.getId())
                                .header(AUTHORIZATION, TEST_AUTHORIZATION_HEADER)
                                .param("lastArticleId", String.valueOf(LAST_ARTICLE_ID))
                                .param("size", String.valueOf(ARTICLE_SIZE))
                                .param("category", Category.ETC.getCategoryName()))
                .andExpect(status().isOk())
                .andDo(
                        document("articles/getPageByCategory",
                                preprocessRequest(prettyPrint()),
                                preprocessResponse(prettyPrint()),
                                requestHeaders(
                                        headerWithName("Authorization").description("회원의 토큰")
                                ),
                                requestParameters(
                                        parameterWithName("lastArticleId").description("마지막 게시글의 ID"),
                                        parameterWithName("size").description("가져올 페이지의 크기(게시물 수)"),
                                        parameterWithName("category").description("가져올 페이지의 카테고리")
                                ),
                                responseFields(
                                        fieldWithPath("[].id").type(JsonFieldType.NUMBER).description("게시글의 ID"),
                                        fieldWithPath("[].title").type(JsonFieldType.STRING).description("게시글의 제목"),
                                        fieldWithPath("[].price").type(JsonFieldType.NUMBER).description("게시글의 가격"),
                                        fieldWithPath("[].thumbnail").type(JsonFieldType.STRING).description("게시글의 대표 사진"),
                                        fieldWithPath("[].tradeState").type(JsonFieldType.STRING).description("게시글의 거래 상태"),
                                        fieldWithPath("[].favoriteCount").type(JsonFieldType.NUMBER).description("게시글의 찜 개수"),
                                        fieldWithPath("[].favoriteState").type(JsonFieldType.BOOLEAN).description("게시글의 찜 여부"),
                                        fieldWithPath("[].createdTime").type(JsonFieldType.STRING).description("게시글의 생성 시간")
                                )));
        // @formatter:on
    }

    @DisplayName("피드의 게시물을 상세조회 한다. 회원의 좋아요도 같이 받아온다.")
    @Test
    void showArticle() throws Exception {
        when(articleViewService.show(anyLong(), any()))
                .thenReturn(ArticleResponse.of(ARTICLE1, Arrays.asList(직고래), true, 1));

        // @formatter:off
        mockMvc
                .perform(
                        get(ARTICLE_API_URI + "/{id}", ARTICLE1.getId())
                                .header(AUTHORIZATION, TEST_AUTHORIZATION_HEADER))
                .andExpect(status().isOk())
                .andDo(
                        document("articles/get",
                                preprocessRequest(prettyPrint()),
                                preprocessResponse(prettyPrint()),
                                requestHeaders(
                                        headerWithName("Authorization").description("회원의 토큰")
                                ),
                                pathParameters(
                                        parameterWithName("id").description("게시글의 ID")
                                ),
                                responseFields(
                                        fieldWithPath("id").type(JsonFieldType.NUMBER).description("게시글의 ID"),
                                        fieldWithPath("title").type(JsonFieldType.STRING).description("게시글의 제목"),
                                        fieldWithPath("organizations.[].id").type(JsonFieldType.NUMBER).description("게시글이 속한 조직의 아이디"),
                                        fieldWithPath("organizations.[].name").type(JsonFieldType.STRING).description("게시글이 속한 조직의 이름"),
                                        fieldWithPath("organizations.[].code").type(JsonFieldType.STRING).description("게시글이 속한 조직의 입장번호"),
                                        fieldWithPath("categoryName").type(JsonFieldType.STRING).description("게시글의 카테고리"),
                                        fieldWithPath("contents").type(JsonFieldType.STRING).description("게시글의 내용"),
                                        fieldWithPath("price").type(JsonFieldType.NUMBER).description("게시글의 가격"),
                                        fieldWithPath("tradeState").type(JsonFieldType.STRING).description("게시글의 판매 상태"),
                                        fieldWithPath("tags").type(JsonFieldType.ARRAY).description("게시글 태그의 리스트"),
                                        fieldWithPath("photos").type(JsonFieldType.ARRAY).description("게시글 사진의 리스트"),
                                        fieldWithPath("author.id").type(JsonFieldType.NUMBER).description("게시글 작성자의 아이디"),
                                        fieldWithPath("author.nickname").type(JsonFieldType.STRING).description("게시글 작성자의 닉네임"),
                                        fieldWithPath("author.avatar").type(JsonFieldType.STRING).description("게시글 작성자의 프로필 사진"),
                                        fieldWithPath("author.score").type(JsonFieldType.NUMBER).description("게시글 작성자의 점수"),
                                        fieldWithPath("favoriteState").type(JsonFieldType.BOOLEAN).description("작성자의 게시글 찜 여부"),
                                        fieldWithPath("favoriteCount").type(JsonFieldType.NUMBER).description("게시글의 찜 개수"),
                                        fieldWithPath("createdTime").type(JsonFieldType.STRING).description("게시글 생성 시간")
                                )));
        // @formatter:on
    }

    @DisplayName("게시글 삭제 시 HTTP status는 noContent다.")
    @Test
    void deleteArticle() throws Exception {
        // @formatter:off
        mockMvc
                .perform(
                        delete(ARTICLE_API_URI + "/" + ARTICLE1.getId())
                                .header(AUTHORIZATION, TEST_AUTHORIZATION_HEADER))
                .andExpect(status().isNoContent())
                .andDo(
                    document("articles/delete",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        requestHeaders(
                                headerWithName("Authorization").description("회원의 토큰")
                        )));
        // @formatter:on
    }

    @DisplayName("판매 상태로 게시글 조회 시 HTTP STATUS OK와 판매 상태에 해당하는 게시글 반환")
    @Test
    void showByTradeState() throws Exception {
        String tradeState = "ON_SALE";

        when(articleViewService.showByTradeState(any(), any()))
                .thenReturn(singletonList(ArticleCardResponse.of(ARTICLE1, 5L, true)));

        // @formatter:off
        mockMvc
                .perform(
                        get(ARTICLE_API_URI)
                                .param("tradeState", tradeState)
                                .header(AUTHORIZATION, TEST_AUTHORIZATION_HEADER))
                .andExpect(status().isOk())
        .andDo(
            document("articles/showByTradeState",
                preprocessRequest(prettyPrint()),
                preprocessResponse(prettyPrint()),
                requestHeaders(
                        headerWithName("Authorization").description("회원의 토큰")
                ),
                responseFields(
                        fieldWithPath("[].id").type(JsonFieldType.NUMBER).description("게시글의 ID"),
                        fieldWithPath("[].title").type(JsonFieldType.STRING).description("게시글의 제목"),
                        fieldWithPath("[].price").type(JsonFieldType.NUMBER).description("게시글의 가격"),
                        fieldWithPath("[].thumbnail").type(JsonFieldType.STRING).description("게시글의 대표 사진"),
                        fieldWithPath("[].tradeState").type(JsonFieldType.STRING).description("게시글의 거래 상태"),
                        fieldWithPath("[].favoriteCount").type(JsonFieldType.NUMBER).description("게시글의 찜 개수"),
                        fieldWithPath("[].favoriteState").type(JsonFieldType.BOOLEAN).description("게시글의 찜 여부"),
                        fieldWithPath("[].createdTime").type(JsonFieldType.STRING).description("게시글의 생성 시간")
                )));
        // @formatter:on
    }

    @DisplayName("판매상태를 변경한다.")
    @Test
    void updateTradeState() throws Exception {
        doNothing().when(articleService).updateTradeState(anyLong(), any(), any());

        TradeStateRequest tradeStateRequest = new TradeStateRequest("RESERVED");

        String request = objectMapper.writeValueAsString(tradeStateRequest);

        // @formatter:off
        mockMvc
                .perform(
                        put(ARTICLE_API_URI + "/" + MEMBER1.getId() + ArticleController.TRADE_STATE_URI)
                                .content(request)
                                .accept(MediaType.APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON)
                                .header(AUTHORIZATION, TEST_AUTHORIZATION_HEADER))
                .andExpect(status().isNoContent())
        .andDo(
            document("articles/updateTradeState",
                preprocessRequest(prettyPrint()),
                preprocessResponse(prettyPrint()),
                requestHeaders(
                        headerWithName("Authorization").description("회원의 토큰")
                )));
        // @formatter:on
    }
}

