alter table member
    drop column if exists state;
alter table member
    drop column if exists kakao_access_token;
alter table member
    drop column if exists kakao_refresh_token;