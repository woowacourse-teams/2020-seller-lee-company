create table if not exists `group`
(
    group_id bigint auto_increment primary key,
    name     varchar(255) not null,
    code     bigint(6)    not null
);
