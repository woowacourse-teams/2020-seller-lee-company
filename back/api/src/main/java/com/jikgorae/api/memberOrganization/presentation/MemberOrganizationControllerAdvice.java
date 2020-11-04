package com.jikgorae.api.memberOrganization.presentation;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.jikgorae.api.common.exception.ExceptionResponse;
import com.jikgorae.api.memberOrganization.exception.MemberOrganizationAlreadyExistsException;

@RestControllerAdvice("com.jikgorae.api.memberOrganization")
public class MemberOrganizationControllerAdvice {
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MemberOrganizationAlreadyExistsException.class)
    public ExceptionResponse handleMemberOrganizationAlreadyExistsException(
            MemberOrganizationAlreadyExistsException e) {
        return ExceptionResponse.of(e);
    }

    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ExceptionHandler(Exception.class)
    public ExceptionResponse handleGlobalException(Exception exception) {
        return ExceptionResponse.of(exception);
    }
}