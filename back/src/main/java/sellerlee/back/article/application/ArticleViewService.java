/**
 * @author joseph415
 */

package sellerlee.back.article.application;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import sellerlee.back.article.domain.ArticleRepository;
import sellerlee.back.favorite.domain.FavoriteRepository;
import sellerlee.back.member.domain.Member;
import sellerlee.back.member.domain.MemberRepository;

@Service
public class ArticleViewService {
    private ArticleRepository articleRepository;
    private MemberRepository memberRepository;
    private FavoriteRepository favoriteRepository;

    public ArticleViewService(ArticleRepository articleRepository,
            MemberRepository memberRepository,
            FavoriteRepository favoriteRepository) {
        this.articleRepository = articleRepository;
        this.memberRepository = memberRepository;
        this.favoriteRepository = favoriteRepository;
    }

    @Transactional(readOnly = true)
    public ArticleResponse showArticle(Long id, Long memberId) {
        Member member = memberRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 회원입니다."));
    }
}
