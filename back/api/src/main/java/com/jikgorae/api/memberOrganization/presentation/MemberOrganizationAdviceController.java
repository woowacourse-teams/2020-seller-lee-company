package com.jikgorae.api.memberOrganization.presentation;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.jikgorae.api.common.exception.ExceptionResponse;
import com.jikgorae.api.memberOrganization.exception.MemberOrganizationAlreadyExistsException;

@ControllerAdvice
public class MemberOrganizationAdviceController {
    @ExceptionHandler(MemberOrganizationAlreadyExistsException.class)
    public ResponseEntity<ExceptionResponse> handleMemberOrganizationAlreadyExistsException(
            MemberOrganizationAlreadyExistsException e) {
        return ResponseEntity
                .badRequest()
                .body(ExceptionResponse.of(e));
    }
}
