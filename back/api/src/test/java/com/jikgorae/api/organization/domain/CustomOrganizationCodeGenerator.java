package com.jikgorae.api.organization.domain;

import java.util.stream.Collectors;
import java.util.stream.IntStream;

public class CustomOrganizationCodeGenerator implements OrganizationCodeGenerator {
    public int generateNumber = 0;

    @Override
    public String generate() {
        String code = String.valueOf(generateNumber++);
        String prefix = IntStream.range(0, CODE_LENGTH - code.length())
                .mapToObj(value -> "0")
                .collect(Collectors.joining());
        return prefix + code;
    }
}
