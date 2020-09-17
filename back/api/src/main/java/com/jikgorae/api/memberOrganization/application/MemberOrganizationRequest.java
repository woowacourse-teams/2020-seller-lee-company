package com.jikgorae.api.memberOrganization.application;

public class MemberOrganizationRequest {
    private String code;

    private MemberOrganizationRequest() {
    }

    public MemberOrganizationRequest(String code) {
        this.code = code;
    }

    public String getCode() {
        return code;
    }
}
