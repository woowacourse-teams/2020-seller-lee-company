create table MEMBER
(
    MEMBER_ID BIGINT not null
        primary key,
    EMAIL VARCHAR(255) not null,
    PASSWORD VARCHAR(255) not null,
    SCORE DOUBLE
);

create table ARTICLE
(
    ARTICLE_ID BIGINT not null
        primary key,
    CATEGORY VARCHAR(255),
    CONTENTS CLOB,
    PRICE BIGINT,
    TITLE VARCHAR(255),
    MEMBER_ID BIGINT,
    constraint FK6L9VKFD5IXW8O8KPH5RJ1K7GU
        foreign key (MEMBER_ID) references MEMBER (MEMBER_ID)
);

create table FAVORITE
(
    FAVORITE_ID BIGINT not null
        primary key,
    ARTICLE_ID BIGINT,
    MEMBER_ID BIGINT,
    constraint FK5W3Q9LJPTHKIXO71HETX3IRED
        foreign key (MEMBER_ID) references MEMBER (MEMBER_ID),
    constraint FK9CGI9Q9DXMH33EE1NDSY9W332
        foreign key (ARTICLE_ID) references ARTICLE (ARTICLE_ID)
);

create table PHOTO
(
    ARTICLE_ID BIGINT not null,
    PHOTOS VARCHAR(255),
    constraint FKRM4WNMB1HCWHXVRMF2X6GF9OX
        foreign key (ARTICLE_ID) references ARTICLE (ARTICLE_ID)
);

create table TAG
(
    ARTICLE_ID BIGINT not null,
    NAME VARCHAR(255),
    constraint FKHUTAVXKKLG0B3KJ7RMCNC9HVF
        foreign key (ARTICLE_ID) references ARTICLE (ARTICLE_ID)
);

insert into member (member_id, email, password, score)
values (1, 'turtle@woowabro.com', '1234', 36),
       (2, 'lxxjn0@gmail.com', '0000', 5.0),
       (3, 'sellerlee@gmail.com', '1234', 4.5);