create table if not exists trade
(
    trade_id      bigint auto_increment
        primary key,
    article_id    bigint   null,
    buyer_id      bigint   null,
    seller_id     bigint   null,
    created_time  datetime null,
    modified_time datetime null,
    foreign key (article_id) references article (article_id) on update CASCADE,
    foreign key (buyer_id) references member (member_id) on update CASCADE,
    foreign key (seller_id) references member (member_id) on update CASCADE
);
