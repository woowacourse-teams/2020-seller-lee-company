package com.jikgorae.api.member.acceptance;

import static com.jikgorae.api.fixture.MemberFixture.*;
import static com.jikgorae.api.member.presentation.AuthController.*;
import static com.jikgorae.api.security.oauth2.authentication.AuthorizationExtractor.*;
import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.DynamicTest.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;

import java.util.stream.Stream;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.DynamicTest;
import org.junit.jupiter.api.TestFactory;
import org.springframework.test.web.servlet.MvcResult;

import com.jikgorae.api.AcceptanceTest;
import com.jikgorae.api.member.application.AuthTokenResponse;
import com.jikgorae.api.security.web.AuthorizationType;

public class MemberAcceptanceTest extends AcceptanceTest {
    private AuthTokenResponse token;

    /**
     * Feature: 회원 관리
     * <p>
     * Scenario: 회원을 관리한다
     * <p>
     * Given 회원이 등록되어 있다.
     * <p>
     * When 닉네임 중복 확인을 한다.
     * Then 닉네임 중복 여부를 응답받는다.
     */
    @DisplayName("회원 관리")
    @TestFactory
    Stream<DynamicTest> manageMember() {
        token = joinAndLogin(MEMBER1);

        return Stream.of(
                dynamicTest("닉네임 중복 확인", () -> {
                            boolean isFound = findNickname(token);
                            assertThat(isFound).isEqualTo(true);
                        }
                ));
    }

    private Boolean findNickname(AuthTokenResponse token) throws Exception {
        MvcResult mvcResult = mockMvc.perform(
                get(MEMBER_API_URI)
                        .header(AUTHORIZATION, String.format("%s %s", AuthorizationType.BEARER,
                                token.getAccessToken()))
                        .param("nickname", MEMBER1.getNickname()))
                .andReturn();

        String json = mvcResult.getResponse().getContentAsString();
        return objectMapper.readValue(json, Boolean.class);
    }
}
