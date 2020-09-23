package com.jikgorae.api.organization.application;

public class OrganizationRequest {
    private String name;

    private OrganizationRequest() {
    }

    public OrganizationRequest(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }
}
