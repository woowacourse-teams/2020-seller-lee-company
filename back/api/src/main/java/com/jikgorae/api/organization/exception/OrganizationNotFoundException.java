package com.jikgorae.api.organization.exception;

public class OrganizationNotFoundException extends IllegalArgumentException {
    public static final String ILLEGAL_ORGANIZATION_CODE = "입장 코드와 일치하는 조직이 존재하지 않습니다.";

    public OrganizationNotFoundException(String s) {
        super(s);
    }
}
