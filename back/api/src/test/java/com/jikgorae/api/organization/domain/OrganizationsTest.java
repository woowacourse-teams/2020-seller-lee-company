package com.jikgorae.api.organization.domain;

import static org.assertj.core.api.Assertions.*;

import java.util.Arrays;
import java.util.List;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class OrganizationsTest {
    @DisplayName("Organization 객체 배열을 이용하여 Organizations 생성")
    @Test
    void of_organization_array() {
        Organization[] organizations = {new Organization(1L), new Organization(2L)};
        assertThat(Organizations.of(organizations)).isInstanceOf(Organizations.class);
    }

    @DisplayName("Organization 아이디들을 이용하여 Organizations 생성")
    @Test
    void of_organization_id_list() {
        List<Long> organizations = Arrays.asList(1L, 2L);
        assertThat(Organizations.of(organizations)).isInstanceOf(Organizations.class);
    }
}