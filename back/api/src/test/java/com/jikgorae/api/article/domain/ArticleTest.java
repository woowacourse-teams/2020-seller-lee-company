package com.jikgorae.api.article.domain;

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.*;
import static org.junit.jupiter.api.DynamicTest.*;

import java.util.stream.Stream;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.DynamicTest;
import org.junit.jupiter.api.TestFactory;

class ArticleTest {
    @DisplayName("생성자 테스트")
    @TestFactory
    Stream<DynamicTest> constructor() {
        return Stream.of(
                dynamicTest("게시글을 생성한다.", this::constructorSuccess),
                dynamicTest("id는 null 일 수 없다.", this::constructorWhenIdNull)
        );
    }

    private void constructorSuccess() {
        assertDoesNotThrow(() -> new Article(1L));
    }

    private void constructorWhenIdNull() {
        assertThatNullPointerException().isThrownBy(() -> new Article(null));
    }
}