package com.jikgorae.api.organization.domain;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class Organizations {
    private List<Organization> organizations;

    public Organizations(List<Organization> organizations) {
        this.organizations = organizations;
    }

    public static Organizations of(Organization... organizations) {
        return new Organizations(Arrays.asList(organizations));
    }

    public static Organizations of(List<Long> organizationIds) {
        List<Organization> organizations = organizationIds.stream()
                .map((organizationId) -> new Organization(organizationId))
                .collect(Collectors.toList());
        return new Organizations(organizations);
    }
}
