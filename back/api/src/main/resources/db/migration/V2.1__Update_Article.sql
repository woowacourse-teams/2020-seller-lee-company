alter table article
    add if not exists created_time datetime null;
alter table article
    add if not exists modified_time datetime null;
alter table article
    add if not exists trade_state varchar(255) null;