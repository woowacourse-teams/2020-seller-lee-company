package com.jikgorae.api.memberOrganization.exception;

public class MemberOrganizationAlreadyExistsException extends IllegalArgumentException {
    public static final String ALREADY_JOINT_ORGANIZATION = "이미 가입된 조직입니다.";

    public MemberOrganizationAlreadyExistsException(String s) {
        super(s);
    }
}
