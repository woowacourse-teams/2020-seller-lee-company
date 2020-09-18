create table if not exists article_organization
(
    article_organization_id bigint auto_increment
        primary key,
    article_id                bigint null,
    organization_id            bigint null,
    foreign key (article_id) references article (article_id) on update CASCADE,
    foreign key (organization_id) references organization (organization_id) on update CASCADE
);