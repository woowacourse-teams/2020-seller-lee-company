alter table member
    add kakao_id varchar(255) not null;
alter table member
    add kakao_access_token varchar(255) not null;
alter table member
    add kakao_refresh_token varchar(255) not null;
alter table member
    add state varchar(255) not null;
alter table member
    drop column password;