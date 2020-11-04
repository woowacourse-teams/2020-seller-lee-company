package com.jikgorae.api.article.presentation;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.jikgorae.api.article.exception.ArticleNotFoundException;
import com.jikgorae.api.article.exception.AuthorizationException;
import com.jikgorae.api.common.exception.ExceptionResponse;

@RestControllerAdvice("com.jikgorae.api.article")
public class ArticleControllerAdvice {
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(ArticleNotFoundException.class)
    public ExceptionResponse handleArticleNotFoundException(ArticleNotFoundException exception) {
        return ExceptionResponse.of(exception);
   }

    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    @ExceptionHandler(AuthorizationException.class)
    public ExceptionResponse handleAuthorizationException(AuthorizationException exception) {
        return ExceptionResponse.of(exception);
    }

    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ExceptionHandler(Exception.class)
    public ExceptionResponse handleGlobalException(Exception exception) {
        return ExceptionResponse.of(exception);
    }
}

