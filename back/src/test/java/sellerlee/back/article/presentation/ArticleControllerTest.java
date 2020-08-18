package sellerlee.back.article.presentation;

import static org.mockito.Mockito.*;
import static org.springframework.restdocs.headers.HeaderDocumentation.*;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.*;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.restdocs.request.RequestDocumentation.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static sellerlee.back.article.acceptance.ArticleAcceptanceTest.*;
import static sellerlee.back.article.presentation.ArticleController.*;
import static sellerlee.back.fixture.ArticleFixture.*;

import java.util.Arrays;
import java.util.Collections;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.restdocs.RestDocumentationContextProvider;
import org.springframework.restdocs.RestDocumentationExtension;
import org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import com.fasterxml.jackson.databind.ObjectMapper;
import sellerlee.back.article.application.ArticleResponse;
import sellerlee.back.article.application.ArticleService;
import sellerlee.back.article.application.ArticleViewService;
import sellerlee.back.article.application.FeedResponse;
import sellerlee.back.article.application.SalesHistoryResponse;
import sellerlee.back.article.application.TradeSateUpdateRequest;

@ExtendWith(RestDocumentationExtension.class)
@WebMvcTest(controllers = ArticleController.class)
class ArticleControllerTest {
    @MockBean
    private ArticleService articleService;

    @MockBean
    private ArticleViewService articleViewService;

    @Autowired
    private ObjectMapper objectMapper;

    private MockMvc mockMvc;

    @BeforeEach
    void setUp(WebApplicationContext context, RestDocumentationContextProvider restDocumentation) {
        mockMvc = MockMvcBuilders.webAppContextSetup(context)
                .apply(documentationConfiguration(restDocumentation))
                .alwaysDo(print())
                .build();
    }

    @DisplayName("게시글 생성 시 HTTP status는 Created다.")
    @Test
    void createArticle() throws Exception {
        String request = objectMapper.writeValueAsString(ARTICLE_CREATE_REQUEST);

        when(articleService.create(any())).thenReturn(1L);

        this.mockMvc.perform(post(ARTICLE_URI)
                .content(request)
                .accept(MediaType.APPLICATION_JSON)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isCreated())
                .andDo(document("articles/post",
                        preprocessRequest(prettyPrint()),
                        // requestHeaders(
                        //         headerWithName("Authorization").description("회원의 토큰")
                        // ),
                        requestFields(
                                fieldWithPath("title").type(JsonFieldType.STRING)
                                        .description("게시글의 제목"),
                                fieldWithPath("category").type(JsonFieldType.STRING)
                                        .description("게시글의 카테고리"),
                                fieldWithPath("contents").type(JsonFieldType.STRING)
                                        .description("게시글의 내용"),
                                fieldWithPath("price").type(JsonFieldType.NUMBER)
                                        .description("게시글의 가격"),
                                // fieldWithPath("tradeState").type(JsonFieldType.STRING)
                                //         .description("게시글의 판매 상태"),
                                fieldWithPath("tags").type(JsonFieldType.ARRAY)
                                        .description("태그의 리스트"),
                                fieldWithPath("photos").type(JsonFieldType.ARRAY)
                                        .description("사진의 리스트"),
                                fieldWithPath("authorId").type(JsonFieldType.NUMBER)
                                        .description("글 작성자의 ID")
                        ),
                        responseHeaders(
                                headerWithName("Location").description("생성된 게시글의 ID가 담긴 URI")
                        )
                ));
    }

    // TODO: 2020/08/17 문서화 테스트 복구
    @Disabled
    @DisplayName("게시글 페이지 조회 시 HTTP STATUS OK와 페이지 별 게시글 반환")
    @Test
    void showPage() throws Exception {
        when(articleViewService.showFeedPage(LAST_ARTICLE_ID, ARTICLE_SIZE, MEMBER1))
                .thenReturn(FeedResponse.listOf(Arrays.asList(ARTICLE2, ARTICLE1),
                        Arrays.asList(1L, 2L), Arrays.asList(true, false)));

        mockMvc.perform(get(ARTICLE_URI)
                .param("lastArticleId", String.valueOf(LAST_ARTICLE_ID))
                .param("size", String.valueOf(ARTICLE_SIZE)))
                .andExpect(status().isOk())
                .andDo(document("articles/getPage",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        // requestHeaders(
                        //         headerWithName("Authorization").description("회원의 토큰")
                        // ),
                        requestParameters(
                                parameterWithName("lastArticleId").description("마지막 게시글의 ID"),
                                parameterWithName("size").description("가져올 페이지의 크기(게시물 수)")
                        ),
                        responseFields(
                                fieldWithPath("[].id").type(JsonFieldType.NUMBER)
                                        .description("게시글의 ID"),
                                fieldWithPath("[].price").type(JsonFieldType.NUMBER)
                                        .description("게시글의 가격"),
                                fieldWithPath("[].favoriteCount").type(JsonFieldType.NUMBER)
                                        .description("게시글의 찜 개수"),
                                fieldWithPath("[].tags").type(JsonFieldType.ARRAY)
                                        .description("태그의 리스트"),
                                fieldWithPath("[].photos").type(JsonFieldType.ARRAY)
                                        .description("사진의 리스트")
                        )
                ));
    }

    // TODO: 2020/08/17 문서화 테스트 복구
    @Disabled
    @DisplayName("피드의 게시물을 상세조회 한다. 회원의 좋아요도 같이 받아온다.")
    @Test
    void showArticle() throws Exception {
        when(articleViewService.show(ARTICLE1.getId(), MEMBER1))
                .thenReturn(ArticleResponse.of(ARTICLE1, true, 1));

        // URI Path variable을 가져와야 해서 RestDocumentationRequestBuilders.get()을 사용했음
        mockMvc.perform(
                RestDocumentationRequestBuilders.get(ARTICLE_URI + "/{id}", ARTICLE1.getId()))
                .andExpect(status().isOk())
                .andDo(document("articles/get",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        // requestHeaders(
                        //         headerWithName("Authorization").description("회원의 토큰")
                        // ),
                        pathParameters(
                                parameterWithName("id").description("게시글의 ID")
                        ),
                        responseFields(
                                fieldWithPath("id").type(JsonFieldType.NUMBER)
                                        .description("게시글의 ID"),
                                fieldWithPath("title").type(JsonFieldType.STRING)
                                        .description("게시글의 제목"),
                                fieldWithPath("categoryName").type(JsonFieldType.STRING)
                                        .description("게시글의 카테고리"),
                                fieldWithPath("contents").type(JsonFieldType.STRING)
                                        .description("게시글의 내용"),
                                fieldWithPath("price").type(JsonFieldType.NUMBER)
                                        .description("게시글의 가격"),
                                fieldWithPath("tradeState").type(JsonFieldType.STRING)
                                        .description("게시글의 판매 상태"),
                                fieldWithPath("tags").type(JsonFieldType.ARRAY)
                                        .description("게시글 태그의 리스트"),
                                fieldWithPath("photos").type(JsonFieldType.ARRAY)
                                        .description("게시글 사진의 리스트"),
                                fieldWithPath("author.id").type(JsonFieldType.NUMBER)
                                        .description("게시글 작성자의 ID"),
                                fieldWithPath("author.avatar").type(JsonFieldType.STRING)
                                        .description("게시글 작성자의 프로필 사진"),
                                fieldWithPath("author.nickname").type(JsonFieldType.STRING)
                                        .description("게시글 작성자의 닉네임"),
                                fieldWithPath("author.score").type(JsonFieldType.NUMBER)
                                        .description("게시글 작성자의 점수"),
                                fieldWithPath("favoriteState").type(JsonFieldType.BOOLEAN)
                                        .description("작성자의 게시글 찜 여부"),
                                fieldWithPath("favoriteCount").type(JsonFieldType.NUMBER)
                                        .description("게시글의 찜 개수"),
                                fieldWithPath("createdTime").type(JsonFieldType.STRING)
                                        .description("게시글 생성 시간")
                        )
                ));
    }

    @DisplayName("게시글 삭제 시 HTTP status는 noContent다.")
    @Test
    void deleteArticle() throws Exception {
        mockMvc.perform(delete(ARTICLE_URI + "/" + ARTICLE1.getId()))
                .andDo(print())
                .andExpect(status().isNoContent());

        verify(articleService).deleteById(ARTICLE1.getId());
    }

    @DisplayName("판매내역을 상세조회 한다.")
    @Test
    void showSalesDetails() throws Exception {
        when(articleViewService.showSalesDetails(any(), any()))
                .thenReturn(Collections.singletonList(SalesHistoryResponse.of(ARTICLE1, 5L, 3L)));

        mockMvc.perform(get(ARTICLE_URI + "/trade-state")
                .param("tradeState", "예약중|판매중"))
                .andDo(print())
                .andExpect(status().isOk());
    }

    @DisplayName("판매상태를 변경한다.")
    @Test
    void patchTradeState() throws Exception {
        doNothing().when(articleService).updateTradeState(any(), any());

        TradeSateUpdateRequest tradeSateUpdateRequest = new TradeSateUpdateRequest(1L, "예약중");

        String request = objectMapper.writeValueAsString(tradeSateUpdateRequest);

        mockMvc.perform(patch(ARTICLE_URI + "/trade-state")
                .content(request)
                .accept(MediaType.APPLICATION_JSON)
                .contentType(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk());
    }
    // @DisplayName("게시글 판매 상태로 게시글 조회 시 HTTP STATUS OK와 판매 상태에 해당하는 게시글 반환")
    // @Test
    // void showArticlesByTradeState() throws Exception {
    //     String tradeState = "ON_SALE";
    //
    //     when(articleViewService.showByTradeState(tradeState)).thenReturn(anyList());
    //
    //     mockMvc.perform(get(ARTICLE_URI + "/trade-state")
    //             .param("tradeState", tradeState))
    //             .andDo(print())
    //             .andExpect(status().isOk());
    // }
}
