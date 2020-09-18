package com.jikgorae.api.organization.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Organization {
    public static final int CODE_LENGTH = 6;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "organization_id")
    private Long id;

    private String name;

    private String code;

    protected Organization() {
    }

    public Organization(Long id, String name, String code) {
        this.id = id;
        this.name = name;
        this.code = code;
    }

    public Organization(Long id) {
        this(id, null, null);
    }

    public Organization(String name, String code) {
        this(null, name, code);
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getCode() {
        return code;
    }
}
