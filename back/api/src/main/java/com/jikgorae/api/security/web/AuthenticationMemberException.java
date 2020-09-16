package com.jikgorae.api.security.web;

public class AuthenticationMemberException extends RuntimeException {
    public AuthenticationMemberException() {
    }

    public AuthenticationMemberException(String message) {
        super(message);
    }
}
