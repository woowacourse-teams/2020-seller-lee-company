package com.jikgorae.api.organization.application;

import com.jikgorae.api.organization.domain.Organization;
import com.querydsl.core.annotations.QueryProjection;

public class OrganizationResponse {
    private Long id;
    private String name;
    private String code;

    private OrganizationResponse() {
    }

    public OrganizationResponse(Long id, String name, String code) {
        this.id = id;
        this.name = name;
        this.code = code;
    }

    @QueryProjection
    public OrganizationResponse(Organization organization) {
        this(organization.getId(), organization.getName(), organization.getCode());
    }

    public static OrganizationResponse of(Organization organization) {
        return new OrganizationResponse(organization.getId(), organization.getName(),
                organization.getCode());
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getCode() {
        return code;
    }
}
