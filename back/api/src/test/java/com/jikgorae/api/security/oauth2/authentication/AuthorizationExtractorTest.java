package com.jikgorae.api.security.oauth2.authentication;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.util.Enumeration;

import javax.servlet.http.HttpServletRequest;

import org.apache.logging.log4j.util.Strings;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.jikgorae.api.security.web.AuthorizationType;

@ExtendWith(MockitoExtension.class)
class AuthorizationExtractorTest {
    @Mock
    private HttpServletRequest httpServletRequest;

    @Test
    void InstanceTest() {
        AuthorizationExtractor authorizationExtractor = new AuthorizationExtractor();

        assertThat(authorizationExtractor).isInstanceOf(AuthorizationExtractor.class);
    }

    @Test
    void extractEmptyTest() {

        when(httpServletRequest.getHeaders(any())).thenReturn(new Enumeration<String>() {
            @Override
            public boolean hasMoreElements() {
                return false;
            }

            @Override
            public String nextElement() {
                return null;
            }
        });

        assertThat(AuthorizationExtractor.extract(httpServletRequest,
                AuthorizationType.BEARER)).isEqualTo(Strings.EMPTY);
    }

    @Test
    void extractTest() {

        when(httpServletRequest.getHeaders(any())).thenReturn(new Enumeration<String>() {
            @Override
            public boolean hasMoreElements() {
                return true;
            }

            @Override
            public String nextElement() {
                return "bearer a,";
            }
        });

        assertThat(AuthorizationExtractor.extract(httpServletRequest,
                AuthorizationType.BEARER)).isEqualTo("a");
    }
}