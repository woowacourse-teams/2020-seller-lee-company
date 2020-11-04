package com.jikgorae.api.article.exception;

public class AuthorizationException extends RuntimeException {
    public static final String UNAUTHORIZED_TO_DELETE = "%s번의 게시글을 삭제할 권한이 없습니다. 접근자 id = %s";
    public static final String UNAUTHORIZED_TO_UPDATE = "%s번의 게시글을 수정할 권한이 없습니다. 접근자 id = %s";

    public AuthorizationException(String message, Long targetId, Long accessorId) {
        super(String.format(message, targetId, accessorId));
    }
}
