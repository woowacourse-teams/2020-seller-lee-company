package com.jikgorae.api.memberOrganization.acceptance;

import static com.jikgorae.api.fixture.MemberFixture.*;
import static com.jikgorae.api.fixture.MemberOrganizationFixture.*;
import static com.jikgorae.api.memberOrganization.presentation.MemberOrganizationController.*;
import static com.jikgorae.api.security.oauth2.authentication.AuthorizationExtractor.*;
import static org.junit.jupiter.api.DynamicTest.*;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.stream.Stream;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.DynamicTest;
import org.junit.jupiter.api.TestFactory;
import org.springframework.http.MediaType;

import com.jikgorae.api.AcceptanceTest;
import com.jikgorae.api.member.application.TokenResponse;
import com.jikgorae.api.security.web.AuthorizationType;

public class MemberOrganizationAcceptanceTest extends AcceptanceTest {
    private TokenResponse token;

    @DisplayName("회원/조직 연관관계 관리")
    @TestFactory
    Stream<DynamicTest> manageMemberOrganization() {
        token = joinAndLogin(MEMBER1);

        return Stream.of(
                dynamicTest("회원/조직 추가", () -> {
                    createMemberOrganization(token);
                })
        );
    }

    private void createMemberOrganization(TokenResponse token) throws Exception {
        String request = objectMapper.writeValueAsString(MEMBER_ORGANIZATION_REQUEST);

        mockMvc.perform(
                post(MEMBER_ORGANIZATION_API_URI)
                        .header(AUTHORIZATION, String.format("%s %s", AuthorizationType.BEARER,
                                token.getAccessToken()))
                        .content(request)
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isCreated());
    }
}
