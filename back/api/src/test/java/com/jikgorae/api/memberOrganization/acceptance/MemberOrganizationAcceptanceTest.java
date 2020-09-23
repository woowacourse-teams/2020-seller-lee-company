package com.jikgorae.api.memberOrganization.acceptance;

import static com.jikgorae.api.fixture.MemberFixture.*;
import static com.jikgorae.api.fixture.OrganizationFixture.*;
import static com.jikgorae.api.memberOrganization.presentation.MemberOrganizationController.*;
import static com.jikgorae.api.security.oauth2.authentication.AuthorizationExtractor.*;
import static org.junit.jupiter.api.DynamicTest.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.stream.Stream;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.DynamicTest;
import org.junit.jupiter.api.TestFactory;

import com.jikgorae.api.AcceptanceTest;
import com.jikgorae.api.member.application.AuthTokenResponse;
import com.jikgorae.api.organization.application.OrganizationResponse;
import com.jikgorae.api.security.web.AuthorizationType;

public class MemberOrganizationAcceptanceTest extends AcceptanceTest {
    private AuthTokenResponse token;

    /**
     * Feature: 회원/조직 연관관계 관리
     * <p>
     * Scenario: 회원/조직 연관관계를 관리한다.
     * <p>
     * <p>
     * Given 조직이 등록되어 있다.
     * <p>
     * Given 회원이 등록되어 있다.
     * <p>
     * When 회원/조직 연관관계를 추가한다.
     * <p>
     * Then 연관관계가 추가되었다.
     * <p>
     * <p>
     * When 회원/조직 연관관계를 삭제한다.
     * <p>
     * Then 연관관계가 삭제된다.
     */
    @DisplayName("회원/조직 연관관계 관리")
    @TestFactory
    Stream<DynamicTest> manageMemberOrganization() throws Exception {
        token = joinAndLogin(MEMBER1);
        OrganizationResponse organizationResponse = createOrganization(token, 배달의민족_요청);

        return Stream.of(
                dynamicTest("회원/조직 추가", () -> {
                    createMemberOrganization(organizationResponse, token);
                }),
                dynamicTest("회원/조직 삭제", () -> {
                    deleteMemberOrganization(organizationResponse.getId(), token);
                })
        );
    }

    private void deleteMemberOrganization(Long id, AuthTokenResponse token) throws Exception {
        mockMvc
                .perform(
                        delete(MEMBER_ORGANIZATION_API_URI)
                                .header(AUTHORIZATION,
                                        String.format("%s %s", AuthorizationType.BEARER,
                                                token.getAccessToken()))
                                .param("id", String.valueOf(id)))
                .andExpect(status().isNoContent());
    }
}
