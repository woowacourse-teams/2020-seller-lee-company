package sellerlee.back.favorite.acceptance;

import static org.junit.jupiter.api.DynamicTest.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static sellerlee.back.common.PageController.*;
import static sellerlee.back.favorite.presentation.FavoriteController.*;
import static sellerlee.back.fixture.MemberFixture.*;
import static sellerlee.back.security.oauth2.authentication.AuthorizationExtractor.*;

import java.util.stream.Stream;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.DynamicTest;
import org.junit.jupiter.api.TestFactory;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MvcResult;

import sellerlee.back.AcceptanceTest;
import sellerlee.back.favorite.application.FavoriteRequest;
import sellerlee.back.member.application.TokenResponse;
import sellerlee.back.security.web.AuthorizationType;

public class FavoriteAcceptanceTest extends AcceptanceTest {
    private TokenResponse token;

    /**
     * Feature: 찜 관리
     * <p>
     * Scenario: 찜을 관리한다.
     * <p>
     * Given 게시글이 생성되어 있다.
     * And 멤버가 생성되어 있다.
     * <p>
     * When 찜 등록을 한다.
     * Then 찜이 추가 된다.
     * <p>
     * When 찜 삭제를 한다.
     * Then 찜이 삭제 된다.
     */
    @DisplayName("찜 관리")
    @TestFactory
    @WithMockUser
    Stream<DynamicTest> manageFavorite() throws Exception {
        token = joinAndLogin(MEMBER1);
        Long articleId = extractId(createArticle(token));

        return Stream.of(
                dynamicTest("찜 생성", () -> createFavorite(articleId)),
                dynamicTest("찜 삭제", () -> deleteFavorite(articleId))
        );
    }

    private String createFavorite(Long articleId) throws Exception {
        FavoriteRequest request = new FavoriteRequest(articleId);

        MvcResult mvcResult = mockMvc.perform(
                post(API_URI + FAVORITE_URI)
                        .header(AUTHORIZATION, String.format("%s %s", AuthorizationType.BEARER,
                                token.getAccessToken()))
                        .accept(MediaType.APPLICATION_JSON_VALUE)
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .content(objectMapper.writeValueAsString(request)))
                .andDo(print())
                .andExpect(status().isCreated())
                .andReturn();

        return mvcResult.getResponse().getHeader("Location");

        // @formatter:off
        // return
        //         given()
        //                 .auth().oauth2(token.getAccessToken())
        //                 .contentType(MediaType.APPLICATION_JSON_VALUE)
        //                 .body(objectMapper.writeValueAsString(request))
        //         .when()
        //                 .post(API_URI+FAVORITE_URI)
        //         .then()
        //                 .log().all()
        //                 .statusCode(HttpStatus.CREATED.value())
        //                 .extract()
        //                 .header(HttpHeaders.LOCATION);
        // @formatter:on
    }

    private void deleteFavorite(Long articleId) throws Exception {
        FavoriteRequest request = new FavoriteRequest(articleId);

        mockMvc.perform(
                delete(API_URI + FAVORITE_URI)
                        .header(AUTHORIZATION, String.format("%s %s", AuthorizationType.BEARER,
                                token.getAccessToken()))
                        .accept(MediaType.APPLICATION_JSON_VALUE)
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .content(objectMapper.writeValueAsString(request)))
                .andDo(print())
                .andExpect(status().isNoContent());

        // @formatter:off
        // given()
        //         .auth().oauth2(token.getAccessToken())
        //         .contentType(MediaType.APPLICATION_JSON_VALUE)
        //         .body(objectMapper.writeValueAsString(request))
        // .when()
        //         .delete(API_URI+FAVORITE_URI)
        // .then()
        //         .log().all()
        //         .statusCode(HttpStatus.NO_CONTENT.value());
        // @formatter:on
    }
}
