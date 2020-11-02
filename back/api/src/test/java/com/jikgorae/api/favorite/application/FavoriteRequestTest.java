package com.jikgorae.api.favorite.application;

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import com.jikgorae.api.ValidationTest;

class FavoriteRequestTest extends ValidationTest {

    @DisplayName("찜 요청 유효성 검사")
    @Test
    void validation() {
        FavoriteRequest request = new FavoriteRequest(1L);
        FavoriteRequest badRequest = new FavoriteRequest(null);

        assertAll(
                () -> assertThat(validator.validate(request).isEmpty()).isTrue(),
                () -> assertThat(validator.validate(badRequest).size()).isEqualTo(1)
        );
    }
}