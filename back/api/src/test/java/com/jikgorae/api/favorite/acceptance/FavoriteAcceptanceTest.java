package com.jikgorae.api.favorite.acceptance;

import static com.jikgorae.api.favorite.presentation.FavoriteController.*;
import static com.jikgorae.api.fixture.MemberFixture.*;
import static com.jikgorae.api.security.oauth2.authentication.AuthorizationExtractor.*;
import static org.junit.jupiter.api.DynamicTest.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.stream.Stream;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.DynamicTest;
import org.junit.jupiter.api.TestFactory;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import com.jikgorae.api.AcceptanceTest;
import com.jikgorae.api.favorite.application.FavoriteRequest;
import com.jikgorae.api.member.application.TokenResponse;
import com.jikgorae.api.security.web.AuthorizationType;

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
                MockMvcRequestBuilders.post(FAVORITE_API_URI)
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
                MockMvcRequestBuilders.delete(FAVORITE_API_URI)
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
