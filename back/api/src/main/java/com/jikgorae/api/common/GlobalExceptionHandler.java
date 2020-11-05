package com.jikgorae.api.common;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.jikgorae.api.article.exception.ArticleNotFoundException;
import com.jikgorae.api.article.exception.AuthorizationException;
import com.jikgorae.api.common.exception.ExceptionResponse;
import com.jikgorae.api.member.domain.IllegalLoginException;
import com.jikgorae.api.member.domain.IllegalProfileException;
import com.jikgorae.api.memberOrganization.exception.MemberOrganizationAlreadyExistsException;
import com.jikgorae.api.organization.exception.OrganizationAlreadyExistsException;
import com.jikgorae.api.organization.exception.OrganizationNotFoundException;

@RestControllerAdvice
public class GlobalExceptionHandler {
    private static final Logger LOGGER = LogManager.getLogger(GlobalExceptionHandler.class);

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(value = {OrganizationNotFoundException.class, ArticleNotFoundException.class,
            MemberOrganizationAlreadyExistsException.class, IllegalProfileException.class,
            IllegalLoginException.class, OrganizationAlreadyExistsException.class,
            OrganizationNotFoundException.class})
    public ExceptionResponse handleIllegalArgumentException(
            IllegalArgumentException e) {
        ExceptionResponse exceptionResponse = ExceptionResponse.of(e);
        LOGGER.warn(exceptionResponse.toString());
        return exceptionResponse;
    }

    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    @ExceptionHandler(AuthorizationException.class)
    public ExceptionResponse handleAuthorizationException(AuthorizationException e) {
        ExceptionResponse exceptionResponse = ExceptionResponse.of(e);
        LOGGER.warn(exceptionResponse.toString());
        return exceptionResponse;
    }

    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ExceptionHandler(Exception.class)
    public ExceptionResponse handleUnexpectedException(Exception e) {
        ExceptionResponse exceptionResponse = ExceptionResponse.of(e);
        LOGGER.error(exceptionResponse.toString());
        return exceptionResponse;
    }
}
