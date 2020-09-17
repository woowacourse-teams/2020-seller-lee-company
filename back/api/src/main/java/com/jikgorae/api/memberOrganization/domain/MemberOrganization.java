package com.jikgorae.api.memberOrganization.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.jikgorae.api.member.domain.Member;
import com.jikgorae.api.organization.domain.Organization;

@Entity
public class MemberOrganization {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_organization_id")
    Long id;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "organization_id")
    private Organization organization;

    protected MemberOrganization() {
    }

    public MemberOrganization(Long id, Member member, Organization organization) {
        this.id = id;
        this.member = member;
        this.organization = organization;
    }

    public MemberOrganization(Member member,
            Organization organization) {
        this.member = member;
        this.organization = organization;
    }

    public Long getId() {
        return id;
    }

    public Member getMember() {
        return member;
    }

    public Organization getOrganization() {
        return organization;
    }
}
