package com.jikgorae.api.article.exception;

public class ArticleNotFoundException extends RuntimeException {
    public static final String NOT_FOUND = "게시글이 존재하지 않습니다. id = ";

    public ArticleNotFoundException(Long id) {
        super(NOT_FOUND + id);
    }
}

