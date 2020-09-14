alter table member
    add if not exists avatar varchar(255) null;
alter table member
    add if not exists nickname varchar(255) null;