package com.jikgorae.api.article.domain;

import static org.assertj.core.api.Assertions.*;

import org.assertj.core.util.Lists;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class PhotosTest {
    @DisplayName("사용자가 올린 사진들에서 첫번째 사진을 썸네일로 사용한다.")
    @Test
    void pickThumbnail() {
        Photos photos = new Photos(Lists.newArrayList("hello", "hi", "goodbye"));

        assertThat(photos.pickThumbnail()).isEqualTo("hello");
    }
}
