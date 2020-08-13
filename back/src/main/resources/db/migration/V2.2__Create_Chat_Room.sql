drop table if exists chat_room CASCADE;

create table if not exists chat_room
(
    chat_room_id bigint auto_increment
        primary key,
    article_id bigint null,
    member_id bigint null,
    foreign key (article_id) references article(article_id) on update CASCADE,
    foreign key (member_id) references member(member_id) on update CASCADE
);

