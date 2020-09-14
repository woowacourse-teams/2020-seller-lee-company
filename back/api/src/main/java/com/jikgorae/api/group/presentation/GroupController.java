package com.jikgorae.api.group.presentation;

import static com.jikgorae.api.group.presentation.GroupController.*;

import java.net.URI;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.jikgorae.api.group.application.GroupResponse;
import com.jikgorae.api.group.application.GroupService;
import com.jikgorae.api.group.domain.Group;

@RestController
@RequestMapping(GROUP_API_URI)
public class GroupController {
    public static final String GROUP_API_URI = "/api/groups";

    private final GroupService groupService;

    public GroupController(GroupService groupService) {
        this.groupService = groupService;
    }

    @PostMapping(params = "name")
    public ResponseEntity<GroupResponse> create(@RequestParam String name) {
        Group group = groupService.create(name);
        return ResponseEntity
                .created(URI.create(GROUP_API_URI + "/" + group.getId()))
                .body(GroupResponse.of(group));
    }
}
