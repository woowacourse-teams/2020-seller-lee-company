package sellerlee.back;

import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static sellerlee.back.article.presentation.ArticleController.*;
import static sellerlee.back.common.PageController.*;
import static sellerlee.back.fixture.ArticleFixture.*;
import static sellerlee.back.security.oauth2.authentication.AuthorizationExtractor.*;

import org.junit.jupiter.api.BeforeEach;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.filter.CharacterEncodingFilter;

import com.fasterxml.jackson.databind.ObjectMapper;
import sellerlee.back.member.application.TokenResponse;
import sellerlee.back.member.domain.Member;
import sellerlee.back.member.domain.MemberRepository;
import sellerlee.back.member.domain.State;
import sellerlee.back.security.oauth2.token.JwtTokenProvider;
import sellerlee.back.security.web.AuthorizationType;

@Sql("/truncate.sql")
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class AcceptanceTest {
    private static final int ID_INDEX_OF_LOCATION = 2;
    private static final String DELIMITER = "/";

    @Autowired
    private WebApplicationContext context;

    protected MockMvc mockMvc;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    protected ObjectMapper objectMapper;

    @Autowired
    MemberRepository memberRepository;

    // @LocalServerPort
    // private int port;
    //
    // protected static RequestSpecification given() {
    //     return RestAssured
    //             .given()
    //             .log().all();
    // }

    @BeforeEach
    protected void setUp() {
        // RestAssured.port = port;
        mockMvc = MockMvcBuilders
                .webAppContextSetup(context)
                .addFilter(new CharacterEncodingFilter("UTF-8", true))
                .apply(springSecurity())
                .build();
    }

    protected Long extractId(String location) {
        String id = location.split(DELIMITER)[ID_INDEX_OF_LOCATION];
        return Long.parseLong(id);
    }

    protected String createArticle(TokenResponse token) throws Exception {
        String request = objectMapper.writeValueAsString(ARTICLE_REQUEST);

        MvcResult mvcResult = mockMvc.perform(
                post(API_URI + ARTICLE_URI)
                        .header(AUTHORIZATION, String.format("%s %s", AuthorizationType.BEARER,
                                token.getAccessToken()))
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(request))
                .andDo(print())
                .andExpect(status().isCreated())
                .andReturn();

        return mvcResult.getResponse().getHeader("Location");
        // }
        // @formatter:off
        // return
        //         given()
        //                 .auth().oauth2(token.getAccessToken())
        //                 .body(request)
        //                 .contentType(MediaType.APPLICATION_JSON_VALUE)
        //         .when()
        //                 .post(API_URI + ARTICLE_URI)
        //         .then()
        //                 .log().all()
        //                 .statusCode(HttpStatus.CREATED.value())
        //                 .extract().header(HttpHeaders.LOCATION);
        // @formatter:on
    }

    protected TokenResponse joinAndLogin(Member member) {
        memberRepository.save(member);

        return TokenResponse.of(jwtTokenProvider.createToken(member.getKakaoId()),
                State.JOIN.name(),
                AuthorizationType.BEARER);
    }
}
