package sellerlee.back.article.domain;

import sellerlee.back.member.domain.Member;

import javax.persistence.*;

@Entity
public class Article {
    @Id
    @GeneratedValue
    @Column(name = "ARTICLE_ID")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member author;

    @Column
    private String title;

    @Column
    @Lob
    private String contents;

    @Column
    @Embedded
    private Tags tags;


    public Article() {
    }

    public Long getId() {
        return id;
    }
}
