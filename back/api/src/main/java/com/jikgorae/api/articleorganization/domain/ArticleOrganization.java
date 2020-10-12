package com.jikgorae.api.articleorganization.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.jikgorae.api.organization.domain.Organization;

@Entity
public class ArticleOrganization {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "article_organization_id")
    private Long id;
    @ManyToOne
    @JoinColumn(name = "organization_id")
    private Organization organization;

    protected ArticleOrganization() {
    }

    public ArticleOrganization(Organization organization) {
        this.organization = organization;
    }

    public Organization getOrganization() {
        return organization;
    }

    public void update(Organization organization) {
        this.organization = organization;
    }
}
