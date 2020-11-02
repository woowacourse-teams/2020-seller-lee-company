package com.jikgorae.api.organization.application;

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class OrganizationResponseTest {
    @DisplayName("equals 테스트")
    @Test
    void equals() {
        OrganizationResponse organizationResponse = new OrganizationResponse(1L, "test", "000000");
        OrganizationResponse same = new OrganizationResponse(1L, "test",
                "000000");
        OrganizationResponse different = new OrganizationResponse(1L, "hello",
                "123456");

        assertAll(
                () -> assertThat(organizationResponse.equals(organizationResponse)).isTrue(),
                () -> assertThat(organizationResponse.equals(null)).isFalse(),
                () -> assertThat(organizationResponse.equals(same)).isTrue(),
                () -> assertThat(organizationResponse.equals(different)).isFalse()
        );
    }
}
