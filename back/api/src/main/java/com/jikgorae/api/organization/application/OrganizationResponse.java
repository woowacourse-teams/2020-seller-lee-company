package com.jikgorae.api.organization.application;

import java.util.Objects;

import com.jikgorae.api.organization.domain.Organization;
import com.querydsl.core.annotations.QueryProjection;

public class OrganizationResponse {
    private Long id;
    private String name;
    private String code;

    private OrganizationResponse() {
    }

    OrganizationResponse(Long id, String name, String code) {
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

    @Override
    public String toString() {
        return "OrganizationResponse{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", code='" + code + '\'' +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;
        OrganizationResponse that = (OrganizationResponse)o;
        return Objects.equals(getId(), that.getId()) &&
                Objects.equals(getName(), that.getName()) &&
                Objects.equals(getCode(), that.getCode());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getName(), getCode());
    }
}
