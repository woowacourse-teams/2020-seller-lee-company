package sellerlee.back.security.oauth2.authentication;

import java.util.Enumeration;

import javax.servlet.http.HttpServletRequest;

import org.apache.logging.log4j.util.Strings;

import sellerlee.back.security.web.AuthorizationType;

public class AuthorizationExtractor {
    public static final String AUTHORIZATION = "Authorization";
    public static final String ACCESS_TOKEN_TYPE = AuthorizationExtractor.class.getSimpleName()
            + ".ACCESS_TOKEN_TYPE";
    public static final String TOKEN_DELIMITER = " ";

    public static String extract(HttpServletRequest request, AuthorizationType type) {
        String typeToLowerCase = type.toLowerCase();
        int typeLength = typeToLowerCase.length();

        Enumeration<String> headers = request.getHeaders(AUTHORIZATION);
        while (headers.hasMoreElements()) {
            String value = headers.nextElement();
            if ((value.toLowerCase().startsWith(typeToLowerCase))) {
                String authHeaderValue = value.substring(typeLength).trim();
                request.setAttribute(ACCESS_TOKEN_TYPE, value.substring(0, typeLength).trim());
                int commaIndex = authHeaderValue.indexOf(',');
                if (commaIndex > 0) {
                    authHeaderValue = authHeaderValue.substring(0, commaIndex);
                }
                return authHeaderValue;
            }
        }
        return Strings.EMPTY;
    }
}
