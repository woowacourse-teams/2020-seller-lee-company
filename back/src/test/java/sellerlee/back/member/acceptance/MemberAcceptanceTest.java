package sellerlee.back.member.acceptance;

import static org.junit.jupiter.api.DynamicTest.*;

import java.util.stream.Stream;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.DynamicTest;
import org.junit.jupiter.api.TestFactory;

import sellerlee.back.AcceptanceTest;

public class MemberAcceptanceTest extends AcceptanceTest {
    /**
     * Feature: 회원 관리
     * <p>
     * Scenario: 회원을 관리한다.
     * <p>
     * When 회원가입 요청을 한다
     * Then 회원 생성 여부를 응답받는다.
     * <p>
     * Given 회원이 등록되어 있다.
     * <p>
     * When 로그인 요청을 한다.
     * Then 회원 정보 존재 여부를 응답받는다.
     */
    @DisplayName("회원 관리")
    @TestFactory
    Stream<DynamicTest> manageMember() {
        return Stream.of(
                dynamicTest("회원 가입", this::join),
                dynamicTest("회원 로그인", this::login)
        );
    }
}
