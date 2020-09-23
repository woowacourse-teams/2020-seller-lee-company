package com.jikgorae.api.articlefavoritecount.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

import com.jikgorae.api.article.domain.Article;

@Entity
public class ArticleFavoriteCount {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "article_favorite_count_id")
    private Long id;

    @OneToOne
    @JoinColumn(name = "article_id")
    private Article article;

    private Long favoriteCount;

    protected ArticleFavoriteCount() {
    }

    public ArticleFavoriteCount(Long id, Article article, Long favoriteCount) {
        this.id = id;
        this.article = article;
        this.favoriteCount = favoriteCount;
    }

    public ArticleFavoriteCount(Article article, Long favoriteCount) {
        this(null, article, favoriteCount);
    }

    public void increase() {
        favoriteCount++;
    }

    public void decrease() {
        favoriteCount--;
    }

    public Long getId() {
        return id;
    }

    public Article getArticle() {
        return article;
    }

    public Long getFavoriteCount() {
        return favoriteCount;
    }
}
