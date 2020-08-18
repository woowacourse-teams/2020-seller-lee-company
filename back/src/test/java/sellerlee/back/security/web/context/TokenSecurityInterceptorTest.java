package sellerlee.back.security.web.context;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.Mockito.*;
import static sellerlee.back.security.oauth2.authentication.AuthorizationExtractor.*;
import static sellerlee.back.security.web.AuthorizationType.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockHttpServletResponse;

import sellerlee.back.security.oauth2.token.JwtTokenProvider;
import sellerlee.back.security.web.AuthenticationException;

@SpringBootTest
public class TokenSecurityInterceptorTest {
    public static final String TEST_TOKEN_SECRET_KEY = "secretsecretsecret";
    public static final String TEST_AUTHORIZATION_HEADER =
            String.join(TOKEN_DELIMITER, BEARER.toLowerCase(), TEST_TOKEN_SECRET_KEY);

    @Autowired
    private TokenSecurityInterceptor interceptor;

    @MockBean
    private JwtTokenProvider jwtTokenProvider;

    private MockHttpServletRequest request;
    private MockHttpServletResponse response;

    @BeforeEach
    void setUp() {
        request = new MockHttpServletRequest();
        response = new MockHttpServletResponse();
    }

    @DisplayName("토큰이 비어있으면 예외 발생")
    @Test
    void preHandle_EmptyToken() {
        assertThatThrownBy(() -> interceptor.preHandle(request, response, null))
                .isInstanceOf(AuthenticationException.class)
                .hasMessage("토큰이 존재하지 않습니다.");
    }

    @DisplayName("토큰이 유효하지 않으면 예외 발생")
    @Test
    void preHandle_InvalidToken() {
        request.addHeader(AUTHORIZATION, TEST_AUTHORIZATION_HEADER);

        assertThatThrownBy(() -> interceptor.preHandle(request, response, null))
                .isInstanceOf(AuthenticationException.class)
                .hasMessage("토큰이 유효하지 않습니다.");
    }

    @DisplayName("토큰이 유효하면 true를 반환")
    @Test
    void preHandle() throws Exception {
        request.addHeader(AUTHORIZATION, TEST_AUTHORIZATION_HEADER);
        when(jwtTokenProvider.validateToken(anyString())).thenReturn(true);

        assertThat(interceptor.preHandle(request, response, null)).isTrue();
    }
}
