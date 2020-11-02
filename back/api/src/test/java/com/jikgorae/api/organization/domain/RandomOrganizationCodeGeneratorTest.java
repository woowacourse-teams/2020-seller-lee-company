package com.jikgorae.api.organization.domain;

import static com.jikgorae.api.organization.domain.RandomOrganizationCodeGenerator.*;
import static org.assertj.core.api.Assertions.*;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class RandomOrganizationCodeGeneratorTest {
    @DisplayName("랜덤한 숫자로 이루어진 6자리 문자열을 생성한다.")
    @Test
    void generator() {
        RandomOrganizationCodeGenerator randomOrganizationCodeGenerator = new RandomOrganizationCodeGenerator();
        String actual = randomOrganizationCodeGenerator.generate();

        assertThat(actual).hasSize(CODE_LENGTH);
        assertThat(actual).isBetween("000000", "999999");
    }
}
