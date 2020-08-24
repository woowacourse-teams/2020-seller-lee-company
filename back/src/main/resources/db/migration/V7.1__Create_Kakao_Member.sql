drop table if exists kakao_member CASCADE;

create table if not exists kakao_member
(
    kakao_member_id bigint auto_increment
        primary key,
    oauth_id    varchar(255) not null,
    name        varchar(255) not null,
    provider_name   varchar(255) not null,
    access_token    varchar(255) not null
);