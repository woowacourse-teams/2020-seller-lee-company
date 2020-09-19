package com.jikgorae.api;

import static com.jikgorae.api.fixture.OrganizationFixture.*;
import static com.jikgorae.api.fixture.TagFixture.*;
import static com.jikgorae.api.memberOrganization.presentation.MemberOrganizationController.*;
import static com.jikgorae.api.organization.presentation.OrganizationController.*;
import static com.jikgorae.api.security.oauth2.authentication.AuthorizationExtractor.*;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.*;
import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.Arrays;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.filter.CharacterEncodingFilter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.jikgorae.api.article.application.ArticleRequest;
import com.jikgorae.api.article.presentation.ArticleController;
import com.jikgorae.api.member.application.AuthTokenResponse;
import com.jikgorae.api.member.domain.Member;
import com.jikgorae.api.member.domain.MemberRepository;
import com.jikgorae.api.memberOrganization.application.MemberOrganizationRequest;
import com.jikgorae.api.organization.application.OrganizationRequest;
import com.jikgorae.api.organization.application.OrganizationResponse;
import com.jikgorae.api.organization.domain.Organization;
import com.jikgorae.api.security.oauth2.provider.JwtTokenProvider;
import com.jikgorae.api.security.web.AuthorizationType;

@Sql("/truncate.sql")
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class AcceptanceTest {
    protected static final String LOCATION = "Location";
    private static final String DELIMITER = "/";
    protected MockMvc mockMvc;

    @Autowired
    protected ObjectMapper objectMapper;

    @Autowired
    private WebApplicationContext context;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private MemberRepository memberRepository;

    @BeforeEach
    protected void setUp() {
        // RestAssured.port = port;
        mockMvc = MockMvcBuilders
                .webAppContextSetup(context)
                .addFilter(new CharacterEncodingFilter("UTF-8", true))
                .apply(springSecurity())
                .alwaysDo(print())
                .build();
    }

    protected Long extractId(String location) {
        List<String> tokens = Arrays.asList(location.split(DELIMITER));
        String id = tokens.get(tokens.size() - 1);
        return Long.parseLong(id);
    }

    protected String createArticle(AuthTokenResponse token) throws Exception {
        return createArticleToOrganization(token, createOrganization(token, 배달의민족_요청));
    }

    protected String createArticleToOrganization(AuthTokenResponse token,
            OrganizationResponse organizationResponse) throws Exception {
        ArticleRequest articleRequest = new ArticleRequest(
                "TEST_TITLE",
                Arrays.asList(new Organization(organizationResponse.getId(),
                        organizationResponse.getName(), organizationResponse.getCode())),
                10_000L,
                "디지털/가전",
                "TEST_CONTENTS",
                Arrays.asList(TAG_FIXTURE1.getName(), TAG_FIXTURE2.getName()),
                Arrays.asList(
                        "https://avatars0.githubusercontent.com/u/53935703?s=400&u=a341d3951da813dca6ec6652c6d1f1d38aa1e42d&v=4",
                        "https://avatars0.githubusercontent.com/u/53935703?s=400&u=a341d3951da813dca6ec6652c6d1f1d38aa1e42d&v=4"));

        String request = objectMapper.writeValueAsString(articleRequest);

        MvcResult mvcResult = mockMvc.perform(
                MockMvcRequestBuilders.post(ArticleController.ARTICLE_API_URI)
                        .header(AUTHORIZATION, String.format("%s %s", AuthorizationType.BEARER,
                                token.getAccessToken()))
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(request))
                .andExpect(status().isCreated())
                .andReturn();

        return mvcResult.getResponse().getHeader(LOCATION);
    }

    protected AuthTokenResponse joinAndLogin(Member member) {
        memberRepository.save(member);

        return AuthTokenResponse.of(member.getId(), member.getNickname(), member.getAvatar(),
                jwtTokenProvider.createToken(member.getKakaoId()), AuthorizationType.BEARER);
    }

    protected OrganizationResponse createOrganization(AuthTokenResponse token,
            OrganizationRequest organizationRequest) throws Exception {
        String request = objectMapper.writeValueAsString(organizationRequest);

        MvcResult mvcResult = mockMvc.perform(
                post(ORGANIZATION_API_URI)
                        .header(AUTHORIZATION, String.format("%s %s", AuthorizationType.BEARER,
                                token.getAccessToken()))
                        .content(request)
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isCreated())
                .andReturn();

        String json = mvcResult.getResponse().getContentAsString();
        return objectMapper.readValue(json, OrganizationResponse.class);
    }

    protected String createMemberOrganization(OrganizationResponse organizationResponse,
            AuthTokenResponse token) throws Exception {
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
