package com.jikgorae.common.group.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Group {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "group_id")
    private Long id;

    private String name;

    private Long number;

    protected Group() {
    }

    public Group(Long id, String name, Long number) {
        this.id = id;
        this.name = name;
        this.number = number;
    }
}
