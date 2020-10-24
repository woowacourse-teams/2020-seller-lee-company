package com.jikgorae.api.organization.presentation;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.jikgorae.api.organization.exception.OrganizationAlreadyExistsException;
import com.jikgorae.api.organization.exception.OrganizationNotFoundException;

@ControllerAdvice
public class OrganizationAdviceController {
    @ExceptionHandler(OrganizationAlreadyExistsException.class)
    public ResponseEntity<String> handleOrganizationAlreadyExistsException(
            OrganizationAlreadyExistsException e) {
        return ResponseEntity
                .badRequest()
                .body(OrganizationAlreadyExistsException.class.getSimpleName() + ": "
                        + e.getMessage());
    }

    @ExceptionHandler(OrganizationNotFoundException.class)
    public ResponseEntity<String> handleOrganizationNotFoundException(
            OrganizationNotFoundException e) {
        return ResponseEntity
                .badRequest()
                .body(OrganizationNotFoundException.class.getSimpleName() + ": " + e.getMessage());
    }
}
