alter table member
    add if not exists kakao_id varchar(255) not null;
alter table member
    add if not exists kakao_access_token varchar(255) not null;
alter table member
    add if not exists kakao_refresh_token varchar(255) not null;
alter table member
    add if not exists state varchar(255) not null;
alter table member
    drop column if exists password;