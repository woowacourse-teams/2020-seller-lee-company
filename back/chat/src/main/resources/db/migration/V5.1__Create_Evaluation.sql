drop table if exists evaluation CASCADE;
drop table if exists score CASCADE;

create table if not exists evaluation
(
    evaluation_id bigint auto_increment  primary key,
    trade_id    bigint   null,
    member_id   bigint   null,
    foreign key (trade_id)  references  trade   (trade_id)  on  update  CASCADE,
    foreign key (member_id) references  member  (member_id) on  update  CASCADE
);

create table if not exists score
(
    evaluation_id bigint null,
    question_id int null,
    score int null,
    foreign key (evaluation_id) references evaluation (evaluation_id) on update CASCADE
);