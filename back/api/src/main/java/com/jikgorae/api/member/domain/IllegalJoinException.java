package com.jikgorae.api.member.domain;

public class IllegalJoinException extends RuntimeException {
    public IllegalJoinException(String message) {
        super(message);
    }
}
