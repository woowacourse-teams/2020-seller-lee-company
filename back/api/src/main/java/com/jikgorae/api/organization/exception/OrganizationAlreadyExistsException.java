package com.jikgorae.api.organization.exception;

public class OrganizationAlreadyExistsException extends IllegalArgumentException {
    public static final String ALREADY_EXISTS_ORGANIZATION_NAME = "이미 존재하는 조직 이름입니다.";

    public OrganizationAlreadyExistsException(String s) {
        super(s);
    }
}
