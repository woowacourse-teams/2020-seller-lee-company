package com.jikgorae.api.organization.domain;

import static java.util.stream.Collectors.*;

import java.util.Random;

import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Component;

@Primary
@Component
public class RandomOrganizationCodeGenerator implements OrganizationCodeGenerator {
    private static final int RANDOM_NUMBER_ORIGIN = 0;
    private static final int RANDOM_NUMBER_BOUND = 10;

    @Override
    public String generate() {
        return new Random().ints(RANDOM_NUMBER_ORIGIN, RANDOM_NUMBER_BOUND)
                .limit(CODE_LENGTH)
                .mapToObj(String::valueOf)
                .collect(joining());
    }
}
