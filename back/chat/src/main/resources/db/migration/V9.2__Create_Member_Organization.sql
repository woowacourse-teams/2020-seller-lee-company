create table if not exists member_organization
(
    member_organization_id bigint auto_increment primary key,
    member_id              bigint not null,
    organization_id        bigint not null
);
