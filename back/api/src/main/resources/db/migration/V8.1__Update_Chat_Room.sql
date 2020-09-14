create table if not exists chat_room
(
    chat_room_id bigint auto_increment
        primary key,
    article_id   bigint null,
    member_id    bigint null,
    foreign key (article_id) references article (article_id) on update CASCADE,
    foreign key (member_id) references member (member_id) on update CASCADE
);

alter table chat_room drop foreign key chat_room_ibfk_2;
alter table chat_room drop column if exists member_id;
alter table chat_room add if not exists seller_id bigint null;
alter table chat_room add if not exists buyer_id bigint null;
alter table chat_room add if not exists created_time datetime null;
alter table chat_room add if not exists modified_time datetime null;

alter table chat_room add foreign key (seller_id) references member (member_id) on update CASCADE;
alter table chat_room add foreign key (buyer_id) references member (member_id) on update CASCADE;
