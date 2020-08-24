alter table member add column kakao_member_id bigint null;

alter table member add CONSTRAINT OAUTH2 foreign key(kakao_member_id)
    REFERENCES kakao_member(kakao_member_id) ON DELETE CASCADE ;