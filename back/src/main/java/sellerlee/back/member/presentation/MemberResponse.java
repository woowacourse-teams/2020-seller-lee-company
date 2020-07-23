/**
 * @author kouz95
 */

package sellerlee.back.member.presentation;

public class MemberResponse {
    private Long id;

    private MemberResponse() {
    }

    public MemberResponse(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }
}
