create table if not exists member_organization
(
    member_organization_id bigint auto_increment primary key,
    member_id              bigint null,
    organization_id        bigint null,
    foreign key (member_id) references member (member_id) on update CASCADE,
    foreign key (organization_id) references organization (organization_id) on update CASCADE
);
