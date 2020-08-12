drop table if exists article CASCADE;
drop table if exists favorite CASCADE;
drop table if exists member CASCADE;
drop table if exists photo CASCADE;
drop table if exists tag CASCADE;

create table if not exists article
(
    article_id bigint auto_increment
        primary key,
    category varchar(255) null,
    contents longtext null,
    price bigint null,
    title varchar(255) null,
    member_id bigint null
)
    engine=InnoDB;

create index FK6l9vkfd5ixw8o8kph5rj1k7gu
    on article (member_id);

create table if not exists favorite
(
    favorite_id bigint auto_increment
        primary key,
    article_id bigint null,
    member_id bigint null
)
    engine=InnoDB;

create index FK5w3q9ljpthkixo71hetx3ired
    on favorite (member_id);

create index FK9cgi9q9dxmh33ee1ndsy9w332
    on favorite (article_id);

create table if not exists member
(
    member_id bigint auto_increment
        primary key,
    email varchar(255) not null,
    password varchar(255) not null,
    score double null
)
    engine=InnoDB;

create table if not exists photo
(
    article_id bigint not null,
    photos varchar(255) null
)
    engine=InnoDB;

create index FKrm4wnmb1hcwhxvrmf2x6gf9ox
    on photo (article_id);

create table if not exists tag
(
    article_id bigint not null,
    name varchar(255) null
)
    engine=InnoDB;

create index FKhutavxkklg0b3kj7rmcnc9hvf
    on tag (article_id);

