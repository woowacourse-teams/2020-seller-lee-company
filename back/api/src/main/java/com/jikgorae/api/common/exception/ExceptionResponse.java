package com.jikgorae.api.common.exception;

public class ExceptionResponse {
    private final String exceptionClassSimpleName;
    private final String errorMessage;

    private ExceptionResponse(String exceptionClassSimpleName, String errorMessage) {
        this.exceptionClassSimpleName = exceptionClassSimpleName;
        this.errorMessage = errorMessage;
    }

    public static ExceptionResponse of(Class<Exception> exceptionClass, String errorMessage) {
        return new ExceptionResponse(exceptionClass.getSimpleName(), errorMessage);
    }
}
