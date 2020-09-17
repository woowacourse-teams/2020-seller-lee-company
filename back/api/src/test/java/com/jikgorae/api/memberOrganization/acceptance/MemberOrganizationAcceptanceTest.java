package com.jikgorae.api.memberOrganization.acceptance;

import static com.jikgorae.api.fixture.MemberFixture.*;
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
import org.springframework.test.web.servlet.MvcResult;

import com.jikgorae.api.AcceptanceTest;
import com.jikgorae.api.member.application.AuthTokenResponse;
import com.jikgorae.api.memberOrganization.application.MemberOrganizationRequest;
import com.jikgorae.api.organization.application.OrganizationResponse;
import com.jikgorae.api.security.web.AuthorizationType;

public class MemberOrganizationAcceptanceTest extends AcceptanceTest {
    private AuthTokenResponse token;
    private OrganizationResponse organizationResponse;

    /**
     * Feature: 회원/조직 연관관계 관리
     * <p>
     * Scenario: 회원/조직 연관관계를 관리한다.
     * <p>
     * Given 조직이 등록되어 있다.
     * Given 회원이 등록되어 있다.
     * When 회원/조직 연관관계를 추가한다.
     * Then 연관관계가 추가되었다.
     *
     */
    @DisplayName("회원/조직 연관관계 관리")
    @TestFactory
    Stream<DynamicTest> manageMemberOrganization() throws Exception {
        token = joinAndLogin(MEMBER1);
        organizationResponse = createOrganization(token);

        return Stream.of(
                dynamicTest("회원/조직 추가", () -> {
                    createMemberOrganization(token);
                })
        );
    }

    private String createMemberOrganization(AuthTokenResponse token) throws Exception {
        String request = objectMapper.writeValueAsString(
                new MemberOrganizationRequest(organizationResponse.getCode()));

        MvcResult mvcResult = mockMvc
                .perform(
                        post(MEMBER_ORGANIZATION_API_URI)
                                .header(AUTHORIZATION,
                                        String.format("%s %s", AuthorizationType.BEARER,
                                                token.getAccessToken()))
                                .content(request)
                                .contentType(MediaType.APPLICATION_JSON)
                                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isCreated())
                .andReturn();

        return mvcResult.getRequest().getHeader(LOCATION);
    }
}
