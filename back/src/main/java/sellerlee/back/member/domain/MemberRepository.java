/**
 * @author lxxjn0
 */

package sellerlee.back.member.domain;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member, Long> {
    Optional<Member> findOptionalMemberByEmail(String email);

    Boolean existsByEmail(String email);
}
