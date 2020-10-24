package com.jikgorae.api.organization.presentation;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.jikgorae.api.common.exception.ExceptionResponse;
import com.jikgorae.api.organization.exception.OrganizationAlreadyExistsException;
import com.jikgorae.api.organization.exception.OrganizationNotFoundException;

@ControllerAdvice
public class OrganizationAdviceController {
    @ExceptionHandler(OrganizationAlreadyExistsException.class)
    public ResponseEntity<ExceptionResponse> handleOrganizationAlreadyExistsException(
            OrganizationAlreadyExistsException e) {
        return ResponseEntity
                .badRequest()
                .body(ExceptionResponse.of(e));
    }

    @ExceptionHandler(OrganizationNotFoundException.class)
    public ResponseEntity<ExceptionResponse> handleOrganizationNotFoundException(
            OrganizationNotFoundException e) {
        return ResponseEntity
                .badRequest()
                .body(ExceptionResponse.of(e));
    }
}
