drop table if exists article_favorite_count CASCADE;

create table if not exists article_favorite_count
(
    article_favorite_count_id bigint auto_increment
        primary key,
    article_id                bigint null,
    favorite_count            bigint null,
    foreign key (article_id) references article (article_id) on update CASCADE
);

