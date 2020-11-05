package com.jikgorae.api.member.domain;

public class IllegalProfileException extends IllegalArgumentException {
    public static final String DUPLICATED_NAME_TO_JOIN = "중복된 이름으로 회원가입 할 수 없습니다.";
    public static final String DUPLICATED_NAME_TO_UPDATE = "중복된 이름으로 변경할 수 없습니다.";

    public IllegalProfileException(String message) {
        super(message);
    }
}
