create table if not exists room
(
    room_id       bigint auto_increment primary key,
    seller_id     bigint   null,
    buyer_id      bigint   null,
    created_time  datetime null,
    modified_time datetime null,

    foreign key (seller_id) references member (member_id) on update CASCADE,
    foreign key (buyer_id) references member (member_id) on update CASCADE
);

