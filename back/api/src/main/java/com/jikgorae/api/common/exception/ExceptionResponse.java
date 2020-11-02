package com.jikgorae.api.common.exception;

public class ExceptionResponse {
    private final String exceptionClassName;
    private final String errorMessage;

    private ExceptionResponse(String exceptionClassName, String errorMessage) {
        this.exceptionClassName = exceptionClassName;
        this.errorMessage = errorMessage;
    }

    public static ExceptionResponse of(Exception exception) {
        return new ExceptionResponse(exception.getClass().getSimpleName(), exception.getMessage());
    }

    public String getExceptionClassName() {
        return exceptionClassName;
    }

    public String getErrorMessage() {
        return errorMessage;
    }
}
