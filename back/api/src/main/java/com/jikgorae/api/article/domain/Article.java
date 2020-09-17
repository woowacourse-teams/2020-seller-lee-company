package com.jikgorae.api.article.domain;

import java.time.LocalDateTime;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.Transient;

import com.jikgorae.api.common.BaseTimeEntity;
import com.jikgorae.api.member.domain.Member;
import com.jikgorae.api.organization.domain.Organization;
import com.jikgorae.api.security.web.AuthorizationException;

@Entity
public class Article extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "article_id")
    private Long id;

    private String title;

    @Transient
    private List<Organization> organizations;

    @Embedded
    private Tags tags;

    @Enumerated(EnumType.STRING)
    private Category category;

    @Lob
    private String contents;

    private Long price;

    @Enumerated(EnumType.STRING)
    private TradeState tradeState;

    @Embedded
    private Photos photos;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member author;

    protected Article() {
    }

    public Article(Long id, String title, List<Organization> organizations, Tags tags,
            Category category,
            String contents, Long price,
            TradeState tradeState, Photos photos, Member author, LocalDateTime createdTime,
            LocalDateTime modifiedTime) {
        this.id = id;
        this.title = title;
        this.organizations = organizations;
        this.tags = tags;
        this.category = category;
        this.contents = contents;
        this.price = price;
        this.tradeState = tradeState;
        this.photos = photos;
        this.author = author;
        this.createdTime = createdTime;
        this.modifiedTime = modifiedTime;
    }

    public Article(Long id, String title, List<Organization> organizations, Tags tags,
            Category category,
            String contents, Long price,
            TradeState tradeState, Photos photos, Member author) {
        this(id, title, organizations, tags, category, contents, price, tradeState, photos, author,
                null, null);
    }

    public Article(String title, List<Organization> organizations, Tags tags, Category category,
            String contents, Long price,
            TradeState tradeState, Photos photos, Member author) {
        this(null, title, organizations, tags, category, contents, price, tradeState, photos,
                author);
    }

    public Article(Long id) {
        this(id, null, null, null, null, null, null, null, null, null);
    }

    public void update(Article article) {
        if (author.isNotSameId(article.author)) {
            throw new AuthorizationException("수정할 수 있는 권한이 없습니다.");
        }
        title = article.title;
        price = article.price;
        category = article.category;
        contents = article.contents;
        tags = article.tags;
        photos = article.photos;
    }

    public void updateTradeState(TradeState tradeState) {
        this.tradeState = tradeState;
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public List<Organization> getOrganizations() {
        return organizations;
    }

    public Tags getTags() {
        return tags;
    }

    public Category getCategory() {
        return category;
    }

    public String getContents() {
        return contents;
    }

    public Long getPrice() {
        return price;
    }

    public TradeState getTradeState() {
        return tradeState;
    }

    public Photos getPhotos() {
        return photos;
    }

    public Member getAuthor() {
        return author;
    }
}
