drop table if exists article CASCADE;
drop table if exists favorite CASCADE;
drop table if exists member CASCADE;
drop table if exists photo CASCADE;
drop table if exists tag CASCADE;

create table if not exists member
(
    member_id bigint auto_increment
        primary key,
    email     varchar(255) not null,
    password  varchar(255) not null,
    score     double       null
);

create table if not exists article
(
    article_id bigint auto_increment
        primary key,
    category   varchar(255) null,
    contents   longtext     null,
    price      bigint       null,
    title      varchar(255) null,
    member_id  bigint       null,
    foreign key (member_id) references member (member_id) on update CASCADE
);

create table if not exists favorite
(
    favorite_id bigint auto_increment
        primary key,
    article_id  bigint null,
    member_id   bigint null,
    foreign key (article_id) references article (article_id) on update CASCADE,
    foreign key (member_id) references member (member_id) on update CASCADE
);

create table if not exists photo
(
    article_id bigint       not null,
    photos     varchar(255) null,
    foreign key (article_id) references article (article_id) on update CASCADE
);

create table if not exists tag
(
    article_id bigint       not null,
    name       varchar(255) null,
    foreign key (article_id) references article (article_id) on update CASCADE
);
