package com.jikgorae.api.group.application;

import com.jikgorae.api.group.domain.Group;

public class GroupResponse {
    private Long id;
    private String name;
    private String code;

    private GroupResponse() {
    }

    public GroupResponse(Long id, String name, String code) {
        this.id = id;
        this.name = name;
        this.code = code;
    }

    public static GroupResponse of(Group group) {
        return new GroupResponse(group.getId(), group.getName(), group.getCode());
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
