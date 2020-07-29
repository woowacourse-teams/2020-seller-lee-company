/**
 * @author lxxjn0
 */

package sellerlee.back.member.application;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

public class MemberLoginRequest {
    @Email(message = "이메일을 입력해주세요.")
    private String email;

    @NotBlank(message = "비밀번호를 입력해주세요.")
    private String password;

    protected MemberLoginRequest() {
    }

    public MemberLoginRequest(String email, String password) {
        this.email = email;
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }
}
