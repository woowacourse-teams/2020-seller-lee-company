package com.jikgorae.api.memberOrganization.exception;

public class MemberOrganizationAlreadyExistException extends IllegalArgumentException {
    public static final String ALREADY_JOINT_ORGANIZATION = "이미 존재하는 조직입니다.";

    public MemberOrganizationAlreadyExistException(String s) {
        super(s);
    }
}
