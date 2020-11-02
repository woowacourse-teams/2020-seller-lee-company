package com.jikgorae.api.favorite.domain;

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.*;
import static org.junit.jupiter.api.DynamicTest.*;

import java.util.stream.Stream;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.DynamicTest;
import org.junit.jupiter.api.TestFactory;

import com.jikgorae.api.article.domain.Article;
import com.jikgorae.api.member.domain.Member;

class FavoriteTest {
    @DisplayName("생성자 테스트")
    @TestFactory
    Stream<DynamicTest> constructor() {
        return Stream.of(
                dynamicTest("찜을 생성한다.", this::constructorSuccess),
                dynamicTest("회원은 null 일 수 없다.", this::constructorWhenMemberNull),
                dynamicTest("게시글은 null 일 수 없다.", this::constructorWhenArticleNull)
        );
    }

    private void constructorSuccess() {
        assertDoesNotThrow(() -> new Favorite(new Article(1L), new Member(1L)));
    }

    private void constructorWhenMemberNull() {
        assertThatNullPointerException().isThrownBy(() -> new Favorite(new Article(1L), null));
    }

    private void constructorWhenArticleNull() {
        assertThatNullPointerException().isThrownBy(() -> new Favorite(null, new Member(1L)));
    }
}