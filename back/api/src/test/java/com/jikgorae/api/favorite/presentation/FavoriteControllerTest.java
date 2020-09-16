package com.jikgorae.api.favorite.presentation;

import static com.jikgorae.api.fixture.ArticleFixture.*;
import static com.jikgorae.api.security.oauth2.authentication.AuthorizationExtractor.*;
import static java.util.Collections.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;
import static org.springframework.restdocs.headers.HeaderDocumentation.*;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.*;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.*;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;

import com.jikgorae.api.ControllerTest;
import com.jikgorae.api.article.application.ArticleCardResponse;
import com.jikgorae.api.favorite.application.FavoriteRequest;
import com.jikgorae.api.favorite.application.FavoriteService;

@WebMvcTest(controllers = FavoriteController.class)
class FavoriteControllerTest extends ControllerTest {
    @MockBean
    private FavoriteService favoriteService;

    @DisplayName("찜 목록 조회 시 찜하고 있는 게시글과 Status OK 반환")
    @Test
    void showFavorites() throws Exception {
        when(favoriteService.showFavorites(any())).thenReturn(
                ArticleCardResponse.listOf(singletonList(ARTICLE1), singletonList(1L),
                        singletonList(true)));

        // @formatter:off
        mockMvc
                .perform(
                        get(FavoriteController.FAVORITE_API_URI)
                                .header(AUTHORIZATION, TEST_AUTHORIZATION_HEADER))
                .andExpect(status().isOk())
                .andDo(document("articles/favorites",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        requestHeaders(
                                headerWithName(AUTHORIZATION).description("회원의 토큰")
                        ),
                        responseFields(
                                fieldWithPath("[].id").description("게시글의 ID"),
                                fieldWithPath("[].title").description("게시글의 제목"),
                                fieldWithPath("[].price").description("게시글의 가격"),
                                fieldWithPath("[].thumbnail").description("게시글의 섬네일"),
                                fieldWithPath("[].tradeState").description("게시글의 거래 상태"),
                                fieldWithPath("[].favoriteCount").description("게시글의 좋아요 개수"),
                                fieldWithPath("[].favoriteState").description("게시글의 좋아요 상태"),
                                fieldWithPath("[].createdTime").description("게시글의 생성 시간")
                        )));
        // @formatter:on
    }

    @DisplayName("찜 추가를 요청 하면 Status Created를 반환하고 Location이 존재한다.")
    @Test
    void create() throws Exception {
        String request = objectMapper.writeValueAsString(new FavoriteRequest(1L));

        when(favoriteService.create(any(), any())).thenReturn(1L);

        // @formatter:off
        mockMvc
                .perform(
                        post(FavoriteController.FAVORITE_API_URI)
                                .header(AUTHORIZATION, TEST_AUTHORIZATION_HEADER)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(request))
                .andExpect(header().exists(HttpHeaders.LOCATION))
                .andExpect(status().isCreated());
    }

    @DisplayName("찜 취소를 요청 하면 Status OK를 반환한다.")
    @Test
    void deleteFavorite() throws Exception {
        String request = objectMapper.writeValueAsString(new FavoriteRequest(1L));

        // @formatter:off
        mockMvc
                .perform(
                        delete(FavoriteController.FAVORITE_API_URI)
                                .header(AUTHORIZATION, TEST_AUTHORIZATION_HEADER)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(request))
                .andExpect(status().isNoContent());
        // @formatter:on

        verify(favoriteService).remove(any(), any());
    }
}
