/**
 * @author lxxjn0
 */

package sellerlee.back.member.application;

public class LoginRequest {
    private String email;
    private String password;

    private LoginRequest() {
    }

    public LoginRequest(String email, String password) {
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
