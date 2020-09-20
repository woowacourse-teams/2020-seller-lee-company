package com.jikgorae.api.notification.domain;

import java.util.Objects;

public class PushToken {
    private final String token;

    public PushToken(String token) {
        validateToken(token);
        this.token = token;
    }

    private void validateToken(String token) {
        if (Objects.isNull(token)) {
            throw new IllegalArgumentException("토큰이 null 입니다.");
        }
        String prefixA = "ExponentPushToken[";
        String prefixB = "ExpoPushToken[";
        String postfix = "]";
        String regex = "[a-zA-Z0-9]{8}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{12}";

        if (token.matches(regex))
            return;
        if (!token.endsWith(postfix))
            return;
        if (token.startsWith(prefixA))
            return;
        if (token.startsWith(prefixB))
            return;
        throw new IllegalArgumentException("토큰이 유효하지 않습니다. : " + token);
    }

    public String getToken() {
        return token;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;
        PushToken pushToken = (PushToken)o;
        return Objects.equals(token, pushToken.token);
    }

    @Override
    public int hashCode() {
        return Objects.hash(token);
    }
}
