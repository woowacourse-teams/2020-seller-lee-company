package com.jikgorae.api.organization.domain;

public interface OrganizationCodeGenerator {
    int CODE_LENGTH = 6;

    String generate();
}
